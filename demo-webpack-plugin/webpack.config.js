const path = require('path');

const HelloWorldPlugin = require('./plugins/hello-world-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HelloWorldPlugin({
      msg: 'hello world'
    })
  ]
};