// compiler.09watchRun.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/09'),
    filename: 'test.js',
    pathinfo: false
  },
  module: {},
  devtool: false,
  optimization: {
    minimize: false
  },
  stats: 'none',
  watch: true,
  plugins: [
    new WebpackHooks({
      watchRun:  () => {
        if (compiler && typeof compiler === 'object') {
          fs.appendFileSync(logPath, 'watchRun\n');
          setTimeout(() => {
            if (compiler.watching) {
              compiler.watching.close();
            }
          }, 250);
        }
      }
    })
  ]
};
