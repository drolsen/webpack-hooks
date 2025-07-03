// compiler.24invalidModule.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');
const testFilePath = path.resolve(__dirname, 'test.js');

let triggered = false;

module.exports = {
  entry: testFilePath,
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/24'),
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
      done: (stats) => {
        // Save reference to watcher on first compile
        if (!triggered) {
          triggered = true;
          setTimeout(() => {
            // Trigger file change to fire `invalid`
            fs.appendFileSync(testFilePath, `\n// touch ${Date.now()}\n`);
          }, 500);
        }
        global.compiler = stats.compilation.compiler;
      },
      invalid:  (fileName, changeTime) => {
        if (fileName && typeof fileName === 'string') {
          fs.appendFileSync(logPath, 'invalid\n');
          setTimeout(() => {
            if (global.compiler.watching && typeof global.compiler.watching.close === 'function') {
              global.compiler.watching.close();
            }
          }, 1000);
        }
      }
    })
  ]
};
