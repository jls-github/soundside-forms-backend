function asyncRoute(fn) {
  return function (...args) {
    fn(...args).catch(args[2]);
  };
}

module.exports = asyncRoute
