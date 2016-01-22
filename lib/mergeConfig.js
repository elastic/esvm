var _           = require('lodash');
var flattenWith = require('./flattenWith');
var explodeBy   = require('./explodeBy');

var mergeConfig = module.exports = function (config, defaults) {
  return _.merge(defaults, config);
};

