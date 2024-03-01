const path = require("path"); // 通过node模块的 path模块获取文件路径

module.exports = {
  mode: "production", // 以告知webpack使用相应模式的内置优化， 默认值是production， 可选：：'none' | 'development' | 'production'；// 会影响打包结果
  // 常见的值:
  // 1.false
  // 2.none => production(默认环境)
  // 3.eval => development(默认环境)
  // 4.source-map => production(默认环境)

  // 不常见的值:
  // 1.eval-source-map: 添加到eval函数的后面
  // 2.inline-source-map: 添加到文件的后面
  // 3.cheap-source-map(dev环境): 低开销, 更加高效
  // 4.cheap-module-source-map: 和cheap-source-map比如相似, 但是对来自loader的source-map处理的更好
  // 5.hidden-source-map: 会生成sourcemap文件, 但是不会对source-map文件进行引用
  devtool: "source-map", // 开启
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "./dist"), // 输入文件路径
    filename: "bundle.js", // 输入文件名
  },
};
