const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'scaffold.js',
    path: path.resolve(__dirname, 'dist')
  }
};