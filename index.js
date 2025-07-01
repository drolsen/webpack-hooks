class WebpackHooks {
  constructor(hooks) {
    this.hooks = hooks;
  }

  apply(compiler) {
    Object.keys(this.hooks).map((i) => {
      if (!compiler.hooks[i]) {
        console.error(`\x1b[31mWebpackHooks: Unknown hook \x1b[37m'${i}' \x1b[31mwas used.\nSee https://webpack.js.org/api/compiler-hooks/ for available hooks.\x1b[0m`);
        return false;
      }

      const isAsync = this.hooks[i].constructor.name === 'AsyncFunction';
      compiler.hooks[i][(isAsync) ? 'tapAsync' : 'tap']('WebpackHooks', (param1, ...args) => {
        this.hooks[i](param1, ...args);
      });
    });
  }
}

module.exports = WebpackHooks;