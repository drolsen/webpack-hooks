// compiler.20afterEmit.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/20'),
    filename: 'test.js',
    pathinfo: false
  },
  module: {},
  devtool: false,
  optimization: {
    minimize: false
  },
  stats: 'none',
  plugins: [
    new WebpackHooks({
      afterEmit:  (compilation) => {
        if (compilation && typeof compilation.getAssets === 'function') {
          fs.appendFileSync(logPath, 'afterEmit\n');
        }
      }
    })
  ]
};
