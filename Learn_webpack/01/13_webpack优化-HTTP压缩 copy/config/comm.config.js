const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./dev.config");
const prodConfig = require("./prod.config");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

/**
 * 抽取开发和生产环境的配置文件
 * 1.将配置文件导出的是一个函数, 而不是一个对象
 * 2.从上向下查看所有的配置属性应该属于哪一个文件
 * * comm/dev/prod
 * 3.针对单独的配置文件进行定义化
 * * css加载: 使用的不同的loader可以根据isProduction动态获取
 */

const smp = new SpeedMeasurePlugin();

const getCommonConfig = function (isProdution) {
  return {
    entry: "./src/main.js",
    output: {
      clean: true,
      path: path.resolve(__dirname, "../build"),
      filename: "js/[name]-bundle.js",
      // 单独针对分包的文件进行命名
      chunkFilename: "js/[name][contenthash:8]_chunk.js",
    },
    resolve: {
      extensions: [".js", ".json", ".wasm", ".jsx", ".ts", ".css"],
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
            // // 'style-loader', //开发阶段
            // MiniCssExtractPlugin.loader, // 生产阶段
            isProdution ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
          // test: /\.css$/,
          // use: [
          //   // 'style-loader', 开发阶段
          //   MiniCssExtractPlugin.loader, // 生产阶段
          //   "css-loader",
          // ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        cache: true,
        minify: isProdution
          ? {
              // 移除注释
              removeComments: true,
              // 移除属性
              removeEmptyAttributes: true,
              // 移除默认属性
              removeRedundantAttributes: true,
              // 折叠空白字符
              collapseWhitespace: true,
              // 压缩内联的CSS
              minifyCSS: true,
              // 压缩JavaScript
              minifyJS: {
                mangle: {
                  toplevel: true,
                },
              },
            }
          : false,
      }),
    ],
  };
};

// webpack允许导出一个函数
module.exports = function (env) {
  const isProduction = env.production;
  let mergeConfig = isProduction ? prodConfig : devConfig;
  const finalConfig = merge(getCommonConfig(isProduction), mergeConfig);
  return smp.wrap(finalConfig);
};
