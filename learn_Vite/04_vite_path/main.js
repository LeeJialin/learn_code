const fs = require("fs");
const path = require("path");

// console.log("=========>", __dirname); // 当前文件的路径  D:\LiJialin\死路一条\learn_code\learn_Vite\04_vite_path

// const file = fs.readFileSync("./common.css");

// console.log(file); // 读取到的是二进制文件
// console.log(file.toString()); // 将二进制文件进行解析，得到源文件内容

// const filePath = path.resolve(__dirname, "./common.css");
// console.log("filePath=========>", filePath.toString()); //  D:\LiJialin\死路一条\learn_code\learn_Vite\04_vite_path\common.css

// console.log("11111========>", process.cwd());  // D:\LiJialin\死路一条\learn_code\learn_Vite\04_vite_path

const utilsFilePath = path.resolve(__dirname + "/format.js");
console.log("111111=========>", utilsFilePath.toString()); // 该方法也不会直接再去匹配没有层级的文件，而是直接做了拼接，当然也比较合理，谁知道src文件下有多个format.js文件  D:\LiJialin\死路一条\learn_code\learn_Vite\04_vite_path\format.js
