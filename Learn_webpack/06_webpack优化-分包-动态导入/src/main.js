import React from "react";
import ReactDom from "react-dom/client";
import App from "./react/App";
import axios from "axios";
import dayjs from "dayjs";
import count from "./utils/count_utlis";

// 5.编写react代码
const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<App />);

console.log("我是入口文件main.js");

// webpack配置跨域
// axios({
//   url: "/api/users/list",
// }).then((res) => {
//   console.log("res=========>", res);
// });

const btn1 = document.createElement("button");
const btn2 = document.createElement("button");
btn1.textContent = "关于";
btn2.textContent = "分类";
document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = function () {
  import(/* webpackChunkName: "about" */ "./router/about").then((res) => {
    res.about();
    res.default();
  });
};

btn2.onclick = function () {
  import(/* webpackChunkName: "category" */ "./router/category");
};
