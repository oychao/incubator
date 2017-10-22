const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'bundle.js',
    // 输出文件所在路径
    path: path.resolve(__dirname, 'dist')
  },
  // 决定模块如何解析
  resolve: {
    // 引入时自动处理的下列后缀的文件，注意点号
    extensions: ['.less', '.js', 'json']
  },
  // 确定不同模块如何被处理
  module: {
    // 不同的文件有不同的解析规则
    rules: [{
      // 一个规则的条件，这里是所有less文件
      test: /\.less$/,
      // 使用加载器处理指定条件的文件，当有多个规则的时候自下向上解析
      use: [{
        // 从JS字符串中创建style节点
        loader: 'style-loader'
      }, {
        // 将css转换为CommonJS
        loader: 'css-loader'
      }, {
        // 将less转换为css
        loader: 'less-loader'
      }]
    }]
  },
  // source-map，方便调试
  devtool: 'inline-source-map',
  // 配合webpack-dev-server使用
  devServer: {
    // webpack-dev-server的根目录
    contentBase: './dist'
  },
  // 使用插件
  plugins: [
    new HtmlWebpackPlugin()
  ]
};