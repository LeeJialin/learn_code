const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: false,
  // entry: './src/index.js',
  entry: './src/main.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, './build'),
    // placeholder
    filename: '[name]-bundle.js',
    // 单独针对分包的文件进行命名
    chunkFilename: '[name]_chunk.js',
    // publicPath: 'http://coderwhycdn.com/'
  },
  // 排除某些包不需要进行打包
  externals: {
    react: "React",
    // key属性名: 排除的框架的名称
    // value值: 从CDN地址请求下来的js中提供对应的名称
    axios: "axios"
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.jsx', '.ts']
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
  // 优化配置
  optimization: {
    // 设置生成的chunkId的算法
    // development: named
    // production: deterministic(确定性)
    // webpack4中使用: natural
    chunkIds: 'deterministic',
    // runtime的代码是否抽取到单独的包中(早Vue2脚手架中)
    runtimeChunk: {
      name: "runtime"
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
          filename: "[id]_utils.js"
        },
        vendors: {
          // /node_modules/
          // window上面 /\
          // mac上面 /
          test: /[\\/]node_modules[\\/]/,
          filename: "[id]_vendors.js"
        }
      }
    },
    // 代码优化: TerserPlugin => 让代码更加简单 => Terser
    minimizer: [
      // JS代码简化
      new TerserPlugin({
        extractComments: false
      })
      // CSS代码简化
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.ts$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}