var _ = require('lodash');
var mergeConfig = module.exports = function (config, defaults) {
  return _.merge(defaults, config);
};

