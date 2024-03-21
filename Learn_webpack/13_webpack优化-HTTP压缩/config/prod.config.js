const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

// path.resolve(__dirname, './src'): 使用 path.resolve() 方法将当前文件所在目录下的 ./src 目录的路径解析为绝对路径。__dirname 表示当前文件所在的目录。
// /**/*: 这是一个通配符，匹配 ./src 目录下的所有子目录和文件。
// { nodir: true }: 这是 glob.sync() 方法的选项参数，表示只返回文件路径，不返回目录路径。因为我们传入了 nodir: true，所以只返回文件路径。
// 综合起来，下面这段代码的作用是返回 ./src 目录下所有文件的路径，不包括子目录的路径。
console.log(glob.sync(`${path.resolve(__dirname, "./src")}/**/*`, { nodir: true }));

module.exports = {
  mode: "production",
  // 优化配置
  optimization: {
    chunkIds: "deterministic",
    // runtime的代码是否抽取到单独的包中(早Vue2脚手架中)
    runtimeChunk: {
      name: "runtime",
    },
    // 分包插件: SplitChunksPlugin
    splitChunks: {
      chunks: "all",
      minSize: 10,

      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        utils: {
          test: /utils/,
          filename: "js/[id]_utils.js",
        },
        vendors: {
          // /node_modules/
          // window上面 /\
          // mac上面 /
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendors.js",
        },
      },
    },
    // 导入模块时, 分析模块中的哪些函数有被使用, 哪些函数没有被使用.
    usedExports: true,
    minimize: true,
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS压缩的插件 TerserPlugin: 
      // extractComments: 控制是否提取注释，默认为 true。当设置为 false 时，不会提取注释。
      // terserOptions: Terser 的选项对象，用于配置 Terser 的行为。
      // compress: 用于配置压缩选项的子对象。在这里，arguments 和 unused 设置为 true，表示启用参数和未使用变量的压缩。
      // mangle: 控制是否混淆变量名，默认为 true。设置为 true 时，会混淆变量名。
      // keep_fnames: 控制是否保留函数名，默认为 false。设置为 true 时，会保留函数名，否则会将函数名压缩。
      // 配置项：
      // extractComments：默认值为true，表示会将注释抽取到一个单独的文件中；
      // ✓ 在开发中，我们不希望保留这个注释时，可以设置为false；
      //  parallel：使用多进程并发运行提高构建的速度，默认值是true
      // ✓ 并发运行的默认数量： os.cpus().length - 1；
      // ✓ 我们也可以设置自己的个数，但是使用默认值即可；
      //  terserOptions：设置我们的terser相关的配置
      // ✓ compress：设置压缩相关的选项；
      // ✓ mangle：设置丑化相关的选项，可以直接设置为true；
      // ✓ toplevel：顶层变量是否进行转换；
      // ✓ keep_classnames：保留类的名称；
      // ✓ keep_fnames：保留函数的名称；
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
            unused: true,
          },
          mangle: true,
          // toplevel: false
          keep_fnames: true,
        },
      }),

      // CSS压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等；
      new CSSMinimizerPlugin({
        parallel: true,
      })
    ],
  },
  plugins: [
    // 完成css的提取
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    // 对CSS进行TreeShaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, { nodir: true }),
      safelist: function () {
        return {
          standard: ["body"],
        };
      },
    }),
     // 对打包后的文件(js/css)进行压缩
     new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: 'gzip',
      minRatio: 0.8 // 至少压缩比例
    })
  ],
};
