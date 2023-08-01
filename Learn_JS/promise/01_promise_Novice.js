// 1、
// const P1 = new Promise((resolve, reject) => {
//   console.log("promise");
// });
// console.log("111111111=========>", P1);

// 2、
// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve("success");
//   console.log(2);
// });
// promise.then(() => {
//   console.log(3);
// });
// console.log(4);

// 3、
// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   console.log(2);
// });
// promise.then(() => {
//   console.log(3);
// });
// console.log(4);

// 4、
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
