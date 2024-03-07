"use strict";
(self["webpackChunk_04_webpack_server"] = self["webpackChunk_04_webpack_server"] || []).push([[792],{

/***/ 627:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(471);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(723);
;// CONCATENATED MODULE: ./src/react/App.jsx

const App = /*#__PURE__*/(0,react.memo)(() => {
  const [count, setCount] = (0,react.useState)(0);
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h1", null, "App Count: ", count), /*#__PURE__*/react.createElement("button", {
    onClick: e => setCount(count + 1)
  }, "+1"));
});
/* harmony default export */ var react_App = (App);
// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(826);
;// CONCATENATED MODULE: ./src/main.js









// 5.编写react代码
const root = client.createRoot(document.querySelector("#root"));
root.render( /*#__PURE__*/react.createElement(react_App, null));
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
btn1.className = 'btn1';
btn1.onclick = function () {
  __webpack_require__.e(/* import() | about */ 594).then(__webpack_require__.bind(__webpack_require__, 10)).then(res => {
    res.about();
    res.default();
  });
};
btn2.onclick = function () {
  __webpack_require__.e(/* import() | category */ 139).then(__webpack_require__.t.bind(__webpack_require__, 459, 23));
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [708], function() { return __webpack_exec__(627); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);