import path from 'path';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '',
    path: path.resolve('dist')
  },
  resolve: {
    extenstions: ['js', 'json', 'jsx']
  },
  module: {
    rules: []
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};
