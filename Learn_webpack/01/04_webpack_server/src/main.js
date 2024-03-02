import React from "react";
import ReactDom from "react-dom/client";
import App from "./react/App";
import axios from "axios";

// 5.编写react代码
const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<App />);

console.log("我是入口文件main.js");

// webpack配置跨域
axios({
  url: "/api/users/list",
}).then((res) => {
  console.log("res=========>", res);
});
