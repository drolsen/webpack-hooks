<div align="center">
  <img src="/assets/logo.jpg" width="300" />
  <p style="margin-top: 25px;">A Webpack plugin that simplifies hook tapping by letting you define them directly in your config.</p>

[![Build Status](https://app.travis-ci.com/drolsen/webpack-hooks.svg?branch=master)](https://app.travis-ci.com/drolsen/webpack-hooks)
[![Minimum node.js version](https://badgen.net/badge/node/%3E=18.17.0/green)](https://npmjs.com/package/webpack-hooks)
[![downloads](https://img.shields.io/npm/dm/webpack-hooks.svg?style=flat-square)](http://npm-stat.com/charts.html?package=webpack-hooks&from=2022-01-08)
[![version](https://img.shields.io/npm/v/webpack-hooks.svg?style=flat-square)](http://npm.im/webpack-hooks)
[![GitLab release](https://badgen.net/github/releases/drolsen/webpack-hooks)](https://github.com/drolsen/webpack-hooks/releases)
[![MIT License](https://img.shields.io/npm/l/webpack-hooks.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/drolsen/webpack-hooks/graphs/commit-activity)
</div>

---

## What Are Webpack Hooks?

When Webpack runs, it goes through a sequence of build phases. During each phase, it exposes various hooks that developers can tap into to customize behavior.

You can find a full list of compiler hooks here:  
👉 https://webpack.js.org/api/compiler-hooks/

Most compiler hooks (before `thisCompilation`) provide the `compiler` object. After that, you typically get the `compilation` object — which exposes its own powerful hook set:  
👉 https://webpack.js.org/api/compilation-hooks/

This allows deep control over both the build life-cycle and the actual compilation pipeline.

---

## Installation

```bash
npm install --save-dev webpack-hooks
```

or

```bash
yarn add --dev webpack-hooks
```

---

## Usage

In your Webpack config, import and instantiate the plugin:

```js
const WebpackHooks = require('webpack-hooks');

module.exports = {
  output: {
    path: '/dist',
    publicPath: '/~media/'
  },
  plugins: [
    new WebpackHooks({
      beforeRun: (compiler) => { ... },
      beforeCompile: (params) => { ... },
      compilation: (compilation) => { ... },
      // more hooks here...
    })
  ]
};
```

---

## Why WebpackHooks?

Webpack's built-in hook API is mostly geared toward writing full plugins. That comes with boilerplate — class structures, life-cycle setup, and file organization (even for tiny customization).

WebpackHooks removes that friction. Just define the hooks you need, right inside your build config.

### Without WebpackHooks

```js
class MyWebpackPlugin {
  constructor(options = {}) {
    this.options = {
      ...options
    };
  }

  apply(compiler) {
    compiler.hooks.entryOptions.tap(
      { name: 'MyWebpackPlugin' }, 
      (context, entry) => {
        console.log(context, entry);
      }
    );
  }
}
```

```js
const MyPlugin = require('./MyPlugin.js');

module.exports = {
  plugins: [ new MyPlugin() ]
};
```

### With WebpackHooks

```js
const WebpackHooks = require('webpack-hooks');

module.exports = {
  plugins: [
    new WebpackHooks({
      entryOption: (context, entry) => {
        console.log(context, entry);
      }
    })
  ]
};
```

This is ideal for:
- Small tweaks that don't justify a full plugin
- Rapid prototyping of custom build logic
- Zero plugin organization needed

---

## tap vs. tapPromise

Want to use `tapPromise` instead of `tap`? Just mark your function `async`:

```js
new WebpackHooks({
  beforeRun: async (compiler) => {
    await doSomething();
  }
});
```

---

## tapOptions()

Some hooks (like `processAssets`) require tap options such as `stage` or `additionalAssets`.

You can pass these options via `tapOptions()`:

```js
new WebpackHooks({
  compilation: {
    processAssets: tapOptions(
      {
        stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        additionalAssets: true
      },
      async (assets) => {
        console.log(assets);
      }
    )
  }
});
```

> 💡 Bonus: Using `async` will automatically use `tapPromise`.

---

## Hook Names

Normally, Webpack requires a `name` property for each hook tap. With WebpackHooks, it's optional — the fallback is `'WebpackHooks'`.

If you want to set a custom name:

```js
new WebpackHooks({
  entryOption: tapOptions({ name: 'CustomName' }, (context, entry) => {
    console.log(context, entry);
  })
});
```

if you want to set a custom global value for all your hook names:
```js
new MyWebpackPlugin('MyHookName', {
  entryOption: (context, entry) => {
    console.log(context, entry);
  }
})
```

or if you don't care what the names are and don't mind they will be named 'WebpackHooks':
```js
new MyWebpackPlugin({
  entryOption: (context, entry) => {
    console.log(context, entry);
  }
})
```
---

### Tests

WebpackHooks comes with a lot of `test`s.
These helps ensure that hooks can be expressed correctly and function as intended.

Simply run `npm run test` or `yarn test` from the root of the plugin to run test.

Running a test will produce a `/dist/` directory.

If you would like to change a test, update the root package.json file's `test` script to use any of the `/test/*.*.config.js` files.