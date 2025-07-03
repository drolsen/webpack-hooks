// compiler.25watchClose.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/25'),
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
      watchClose:  () => {
        fs.appendFileSync(logPath, 'watchClose\n');
      },
      done: (stats) => {
        setTimeout(() => {
          const watching = stats.compilation.compiler.watching;
          if (watching && typeof watching.close === 'function') {
            watching.close();
          }
        }, 250);
      }
    })
  ]
};
