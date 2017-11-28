const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: path.resolve(__dirname, 'tools', 'test-loader')
      }, {
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }, {
      test: /\.txt$/,
      use: [{
        loader: path.resolve(__dirname, 'tools', 'txt-loader')
      }]
    }]
  },
  externals: {},
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  }
};

/**
 * entry
 * output
 *  filename
 *  path
 * resolve
 *  extensions
 * module
 *  rules
 *    test
 *    use
 *      loader
 * plugins
 * externals
 * devTool
 * devServer
 *  contentBase
 */