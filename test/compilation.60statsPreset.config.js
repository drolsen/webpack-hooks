// compilation.60statsPreset.config.js
const WebpackHooks = require('../index.js');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compilation-hooks/60'),
    filename: 'test.js',
    pathinfo: false
  },
  module: {},
  devtool: false,
  optimization: {
    minimize: false
  },
  mode: 'production',
  stats: 'normal', // 👈 this must match the preset you're tapping
  plugins: [
    new WebpackHooks({
      compilation: {
        statsPreset: tapOptions({ for: 'normal', name: 'TestName' }, () => {
          fs.appendFileSync(logPath, 'statsPreset\n');
        })
      }
    })
  ]
};
