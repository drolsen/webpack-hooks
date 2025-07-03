// compiler.23failed.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/23'),
    filename: 'test.js',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, 'nonexistent-loader.js')
        }
      }
    ]
  },
  devtool: false,
  optimization: {
    minimize: false
  },
  stats: 'none',
  plugins: [
    new WebpackHooks({
      failed: (error) => {
        if (error && error instanceof Error) {
          fs.appendFileSync(logPath, 'failed\n');
        }
      }
    })
  ]
};
