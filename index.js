const HOOK_TAP_OPTIONS = Symbol('WebpackHookTapOptions');

global.tapOptions = (options, fn, compilation) => Object.assign(
  fn, {
    tapOptions: {
      ...options
    }
  }
);

global.compiler = {};
global.compilation = {};

function getTapType(fn) {
  if (fn.constructor.name === 'AsyncFunction') return 'tapPromise';
  // if (fn.length >= 2) return 'tapAsync';
  return 'tap';
}

const RecursiveHookTapping = (hooks, parents = [ global.compiler ]) => {
  let foundHook = false;
  for (const hookName in hooks) {
    const hook = hooks[hookName];

    // If the recursivly looped hook decliration is found in our parent.hooks, proceed
    for (const parent of parents) {
      if (!parent.hooks) { continue; }
      if (parent.hooks[hookName]) {
        // Tap and Tap more
        if (typeof hook === 'object') {
          parent.hooks[hookName][getTapType(hook)]('WebpackHooks', (...callbackParams) => {
            RecursiveHookTapping(hook, callbackParams);
          });
        }

        // Done tapping, now run user's give user their data
        if (typeof hook === 'function') {
          // If user has defined a tapOptions, but forgot a name, fall back to 'WebpackHooks'
          if (hook.tapOptions) {
            if (!hook.tapOptions.name) {
              hook.tapOptions.name = 'WebpackHooks';
            }
          } else {
            hook.tapOptions = {
              name: 'WebpackHooks'
            };
          }

          // HookMaps
          if (parent.hooks[hookName].constructor.name === 'HookMap') {
            if (hook.tapOptions.for) {
              parent.hooks[hookName].for(hook.tapOptions.for)[getTapType(hook)](
                hook.tapOptions, 
                (...compilationHookParams) => 
                  hook(...compilationHookParams)
              );
            } else {
              console.error(`\x1b[31mWebpackHooks: The HookMap \x1b[37m'${hookName}'\x1b[31m was used incorrectly.\nHookMaps require a \x1b[37m"{ for: 'type' }"\x1b[31m within it's tapOptions.\nPlease see https://webpack.js.org/api/compilation-hooks/#${hookName.toLowerCase()} for more information.\x1b[0m`);
            }
          // All Other Hooks
          } else {
            parent.hooks[hookName][getTapType(hook)](
              hook.tapOptions,
              (...compilationHookParams) => 
                hook(...compilationHookParams)
            );
          }
        }
      } else {
        console.error(`\x1b[31mWebpackHooks: Unknown hook \x1b[37m'${hookName}' \x1b[31mwas used.\x1b[0m`);
      }
    }
  }
}

class WebpackHooks {
  constructor(hooks) {
    this.hooks = hooks;
  }

  apply(compiler) {
    global.compiler = compiler;
    RecursiveHookTapping(this.hooks);
  }
}

module.exports = WebpackHooks;