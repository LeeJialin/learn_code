const path = require("path"); // 通过node模块的 path模块获取文件路径
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production", // 以告知webpack使用相应模式的内置优化， 默认值是production， 可选：：'none' | 'development' | 'production'；// 会影响打包结果
  devtool: false,
  // 入口文件
  entry: {
    // 配置共享依赖包
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    main: {
      import: "./src/main.js",
      dependOn: "shared",
    },
    shared: ["dayjs", "axios"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // 输入文件路径
    filename: "[name].bundle.js", // 输入文件名
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // 针对jsx?代码进行babel处理
      {
        test: /\.jsx?$/, // x?: 0或者1个x
        use: {
          loader: "babel-loader",
        },
      },
      // ts
      {
        test: /\.ts?$/, // x?: 0或者1个x
        use: {
          // use: "ts-loader"
          loader: "babel-loader", // babel-loader 包含 ts-loader
        },
      },
    ],
  },
  // 处理文件后缀名
  resolve: {
    extensions: [".js", ".json", ".ts", ".jsx"],
  },
  devServer: {
    open: true, // 是否打开浏览器 默认false
    port: 8080, // 指定开发服务器的端口
    hot: true, // 启用热模块替换
    historyApiFallback: true, // 当使用 HTML5 History API 时，404 响应会被替代为 index.html
    static: ["public", "static"],
    compress: true, // 是否为静态文件开启gzip 默认值是false
    // 跨域配置
    historyApiFallback: true, // 默认false，设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容
    proxy: [
      {
        context: ["/api", "/auth"], // 设置多个，下面的是设置单个，但是有点问题
        target: "http://localhost:9000",
        // "^/api": ""  ： 将api清掉
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true, // true：开启的本地服务器直接以 9000 发送请求， false：以 8000 发送请求 (proxy发送请求实际是在node环境里请求，并非游览器，如果服务器有检查端口的还是是8000发送则会请求不到数据)
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 100, // 将包拆分成不小于minSize的包
      // maxSize: 20000, // 当一个包大于指定的大小时, 继续进行拆包
      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        utils1: {
          test: /utils/,
          filename: "[id]_utils.js",
        },
        vendors: {
          // /node_modules/
          // window上面 /\
          // mac上面 /
          test: /[\\/]node_modules[\\/]/,
          filename: "[id]_vendors.js",
        },
      },
    },
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS代码简化
      new TerserPlugin({
        extractComments: false,
      }),
      // CSS代码简化
    ],
  },
};
