const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: false,
  // entry: './src/index.js',
  entry: "./src/main.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "./build"),
    // placeholder
    filename: "js/[name]-bundle.js",
    // 单独针对分包的文件进行命名
    chunkFilename: "js/[name][contenthash:8]_chunk.js",
  },
  // 排除某些包不需要进行打包
  externals: {
    react: "React",
    // key属性名: 排除的框架的名称
    // value值: 从CDN地址请求下来的js中提供对应的名称
    axios: "axios",
  },
  resolve: {
    extensions: [".js", ".json", ".wasm", ".jsx", ".ts", ".css"],
  },
  devServer: {
    static: ["public", "content"],
    port: 3000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  // 优化配置
  optimization: {
    // 设置生成的chunkId的算法
    // development: named
    // production: deterministic(确定性)
    // webpack4中使用: natural
    chunkIds: "deterministic",
    // runtime的代码是否抽取到单独的包中(早Vue2脚手架中)
    runtimeChunk: {
      name: "runtime",
    },
    // 分包插件: SplitChunksPlugin
    splitChunks: {
      chunks: "all",
      // 当一个包大于指定的大小时, 继续进行拆包
      // maxSize: 20000,
      // // 将包拆分成不小于minSize的包
      // minSize: 10000,
      minSize: 10,

      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        utils: {
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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', 开发阶段
          MiniCssExtractPlugin.loader, // 生产阶段
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // 完成css的提取
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    // 作用域提升
    // ModuleConcatenationPlugin 是 Webpack 的内置插件之一，用于启用模块串联（Module Concatenation）优化。它的作用是将模块的作用域尽可能合并到一个函数中，以减少函数声明的数量，提高代码在浏览器中的执行速度。
    // 具体来说，该插件会尝试寻找模块之间的依赖关系，将它们合并到一个函数作用域中，从而减少函数调用和模块加载时的开销。这种优化可以减小 JavaScript 文件的体积，并提高代码的执行效率。
    // 在 Webpack 4 中，ModuleConcatenationPlugin 默认是开启的，不需要手动添加该插件。然而，在 Webpack 5 中，它被移除了默认配置，并改为作为一个单独的插件，需要手动添加到配置中以启用模块串联优化。
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
