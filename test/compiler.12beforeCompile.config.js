// compiler.12beforeCompile.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/12'),
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
      beforeCompile:  (params) => {
        if (params && typeof params.normalModuleFactory === 'object') {
          fs.appendFileSync(logPath, 'beforeCompile\n');
        }
      }
    })
  ]
};
