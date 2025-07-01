class WebpackHooks {
  constructor(hooks) {
    this.hooks = hooks;
  }

  apply(compiler) {
    Object.keys(this.hooks).map((i) => {
      compiler.hooks[i].tap('WebpackHooks', (param1, param2 = undefined, param3 = undefined) => {
        this.hooks[i](param1, param2, param3);
      });
    });
  }
}

module.exports = WebpackHooks;