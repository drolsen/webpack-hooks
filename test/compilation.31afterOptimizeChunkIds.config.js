// compilation.31afterOptimizeChunkIds.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');


module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compilation-hooks/31'),
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
        afterOptimizeChunkIds:  (...args) => {
          if (args.every(x => x !== null && x !== undefined)) {
            fs.appendFileSync(logPath, 'afterOptimizeChunkIds\n');
          }
        }
      }
    })
  ]
};
