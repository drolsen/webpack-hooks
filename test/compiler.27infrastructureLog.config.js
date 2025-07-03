// compiler.27infrastructureLog.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/27'),
    filename: 'test.js',
    pathinfo: false
  },
  module: {},
  devtool: false,
  optimization: {
    minimize: false
  },
  stats: 'none',
  infrastructureLogging: {
    level: 'info'
  },
  plugins: [
    new WebpackHooks({
      infrastructureLog:  (origin, type, message) => {
        if (origin && type && message) {
          const inputData = fs.readFileSync(logPath).toString();

          if (inputData.indexOf('infrastructureLog') === -1) {
            fs.appendFileSync(logPath, 'infrastructureLog\n');
          }
        }
      }
    })
  ]
};
