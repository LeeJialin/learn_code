<template>
  <h1>我的大文件上传</h1>
  <input type="file" @change="handleUpload" />
</template>

<script setup lang="ts">
import SparkMD5 from "spark-md5";
import { ref } from "vue";
import axios from "axios";

const fileName = ref<string>("");
const fileSize = ref<number>(0);
const fileHash = ref<string>("");

// 上传方法
const handleUpload = async (e: Event) => {
  // 获取文件
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  fileName.value = files[0].name;
  fileSize.value = files[0].size;

  // 文件分片
  const chunks = createChunks(files[0]);
  console.log("chunks=========>", chunks);

  // 计算hash值
  const hash = await calcuteHash(chunks);
  fileHash.value = hash;
  console.log("hash=========>", hash);

  // 校验是否需要上传
  const { data } = await verifyUpload();
  const existsChunks = data.existsChunks;
  if (!data.shouldUpload) {
    alert("秒传成功");
    return;
  }

  // 分片上传
  uploadChunks(chunks, existsChunks);
};

// 按照 1M 进行分片
const CHUNK_SIZE = 1024 * 1024;
const createChunks = (file: File) => {
  let cur = 0; // 查看分片的位置
  let chunks = [];
  while (cur < file.size) {
    const blob = file.slice(cur, cur + CHUNK_SIZE);
    chunks.push(blob);
    cur += CHUNK_SIZE;
  }
  return chunks;
};

// 计算切片文件hash值
const calcuteHash = (chunks: Array<Blob>) => {
  return new Promise((resolve) => {
    const targets: Blob[] = [];

    chunks.forEach((chunk, i) => {
      if (i === 0 || i === chunks.length - 1) {
        targets.push(chunk);
      } else {
        targets.push(chunk.slice(0, 2));
        targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2));
        targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE));
      }
    });

    // 以下是生成hash值第三方库方法使用---- start
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(new Blob(targets));

    // 这个方法是一个异步方法
    fileReader.onload = (e) => {
      spark.append((e.target as FileReader).result);
      resolve(spark.end());
    };
    // ----- end
  });
};

// 分片上传
const uploadChunks = async (chunks: Array<Blob>, existsChunks: string[]) => {
  const data = chunks.map((chunk, i) => {
    return {
      fileName: fileName.value,
      fileHash: fileHash.value,
      chunkHash: fileHash.value + "-" + i,
      chunk: chunk,
    };
  });
  // filter 函数实现的断点续传，通过调用 verify 接口判断每次上传文件前是否有上传过切片的文件；
  const formDatas = data
    .filter((item) => !existsChunks.includes(item.chunkHash))
    .map((item) => {
      const formData = new FormData();
      formData.append("fileName", item.fileName);
      formData.append("fileHash", item.fileHash);
      formData.append("chunkHash", item.chunkHash);
      formData.append("chunk", item.chunk);
      return formData;
    });

  const max = 6; // 最大并发数
  const taskPool: any = []; // 请求队列
  let index = 0; //  请求数

  while (index < formDatas.length) {
    const task = axios({
      url: "http://localhost:3000/upload",
      method: "POST",
      data: formDatas[index],
    });
    task.then(() => {
      taskPool.splice(taskPool.findIndex((item: any) => item.task)); // ???没看懂
    });
    taskPool.push(task);
    if (taskPool.length === max) {
      await Promise.race(taskPool);
    }
    index++;
  }
  await Promise.all(taskPool);

  // 所有分片上传完成后，通知服务器可以合并了
  mergeRequest();
};

// 合并请求
const mergeRequest = () => {
  axios({
    url: "http://localhost:3000/merge",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      fileHash: fileHash.value,
      fileName: fileName.value,
      size: CHUNK_SIZE,
    }),
  }).then(() => {
    alert("合并成功！");
  });
};

/**
 * 验证该文件是否需要上传，文件通过hash生成唯一，改名后也是不需要再上传的，也就相当于秒传
 */
const verifyUpload = async () => {
  return axios({
    url: "http://127.0.0.1:3000/verify",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      fileName: fileName.value,
      fileHash: fileHash.value,
    }),
  }).then((res) => {
    console.log("res=========>", res.data);
    return res.data;
  });
};
</script>

<style scoped></style>
