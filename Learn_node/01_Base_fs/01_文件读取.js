const fs = require("fs");
// 同步读取
// const res = fs.readFileSync("./public/text.txt", {
//   encoding: "utf-8",
// });
// console.log("res=========>", res);

// 异步读取-方式1
// const res1 = fs.readFile(
//   "./public/text.txt",
//   {
//     encoding: "utf-8",
//   },
//   (err, data) => {
//     if (err) {
//       console.log("err=========>", err);
//     } else {
//       console.log("data=========>", data);
//     }
//   }
// );

// 异步读取-方式2
const res2 = fs.promises
  .readFile("./public/text.txt", { encoding: "utf-8" })
  .then((res) => {
    console.log("res=========>", res);
  })
  .catch((err) => {
    console.log("err=========>", err);
  });
