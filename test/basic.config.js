const WebpackHooks = require('../index.js');
const { sources } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist/basic'),    
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
    new CleanWebpackPlugin({
      'cleanOnceBeforeBuildPatterns': [path.resolve('./dist')]
    }),
    new WebpackHooks({
      compilation: (compilation) => {
        compilation.hooks.processAssets.tapPromise(
          {
            name: 'MyWebpackPlugin',
            stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
            additionalAssets: true
          },
          async (assets) => {
            // Walk each generated asset
            for (const assetName of Object.keys(assets)) {
              if (!assetName.endsWith('.js')) continue;
              
              // Get original JS source for the matching entry
              const originalSource = compilation.getAsset(assetName).source.source();

              // Build the injection template
              const runtimeInjection = `// THIS IS A TEST COMMENT`;

              // Inject runtime payload into original JS
              compilation.updateAsset(
                assetName,
                new sources.RawSource(originalSource + '\n\n' + runtimeInjection)
              );
            }
          }
        );
      }
    }) 
  ]
};

