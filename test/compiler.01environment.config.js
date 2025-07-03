// test/compiler-hooks/01.environment.js
const WebpackHooks = require('../index.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const logPath = path.resolve(__dirname, '../dist/hooks.log');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/compiler-hooks/01'),
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
    /*new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve('./dist')]
    }),*/
    new WebpackHooks({
      environment: () => {
        fs.writeFileSync(logPath, 'environment\n');
      }
    })
  ]
};
