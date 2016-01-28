var flattenWith = require('./flattenWith');
module.exports = function (options) {
  if (options.config) options.config = flattenWith(options.config, '.');
  return options;
};
