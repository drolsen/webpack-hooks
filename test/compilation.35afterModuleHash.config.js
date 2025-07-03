// compilation.35afterModuleHash.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');


module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compilation-hooks/35'),
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
      compilation: {
        afterModuleHash:  (...args) => {
          if (args.every(x => x !== null && x !== undefined)) {
            fs.appendFileSync(logPath, 'afterModuleHash\n');
          }
        }
      }
    })
  ]
};
