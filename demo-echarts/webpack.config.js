const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello Echarts',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  module: {
    loaders: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  externals: {
    echarts: 'echarts'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
};
