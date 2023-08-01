const { packAwait } = require("./utils.js");

const p1 = Promise.reject({
  name: 1,
  age: 20,
});
const p2 = Promise.resolve("成功的结果");

async function foo() {
  let res = await p1();
  console.log("res1=========>", res);
  // let [res2, err2] = await packAwait(p2);
  // console.log("res1=========>", res2, err2);
}
foo();
