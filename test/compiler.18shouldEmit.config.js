// compiler.18shouldEmit.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/18'),
    filename: 'test.js',
    pathinfo: false
  },
  recordsInputPath: path.resolve(__dirname, '../dist/compiler-hooks/29/records.json'),
  recordsOutputPath: path.resolve(__dirname, '../dist/compiler-hooks/29/records.json'),
  module: {},
  devtool: false,
  optimization: {
    minimize: false
  },
  stats: 'none',
  plugins: [
    new WebpackHooks({
      shouldEmit:  (compilation) => {
        fs.appendFileSync(logPath, 'shouldEmit\n');
        return true;
      }
    })
  ]
};
