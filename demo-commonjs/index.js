const require = (path) => {
  const module = require.module[path];
  if (!module) {
    throw new Error(`Module ${path} not registered.`);
  }
  if (module.exports) {
    return module.exports;
  }
  module.exports = {};
  module.func.call(null, module, module.exports, require);
  return module.exports;
};

require.module = {};

require.register = (path, func) => {
  require.module[path] = {
    func,
    exports: null
  };
};

require.init = fn => {
  fn.call(null, require);
};