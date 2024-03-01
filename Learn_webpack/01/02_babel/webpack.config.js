const path = require("path"); // 通过node模块的 path模块获取文件路径

module.exports = {
  mode: "production", // 以告知webpack使用相应模式的内置优化， 默认值是production， 可选：：'none' | 'development' | 'production'；// 会影响打包结果
  devtool: "source-map", // 开启
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "./dist"), // 输入文件路径
    filename: "bundle.js", // 输入文件名
    // clean: true, // 重新打包时，将之前的打包文件删掉
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // x?: 0或者1个x
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          //   options: {
          //     // plugins: [
          //     //   "@babel/plugin-transform-arrow-functions",
          //     //   "@babel/plugin-transform-block-scoping"
          //     // ]
          //     presets: [
          //       ["@babel/preset-env", {
          //         // 在开发中针对babel的浏览器兼容查询使用browserslist工具, 而不是设置target
          //         // 因为browserslist工具, 可以在多个前端工具之间进行共享浏览器兼容性(postcss/babel)
          //         // targets: ">5%"
          //       }]
          //     ]
          //   }
        },
      },
    ],
  },
};
