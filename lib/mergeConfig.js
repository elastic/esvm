var _           = require('lodash');
var flattenWith = require('./flattenWith');
var explodeBy   = require('./explodeBy');

var mergeConfig = module.exports = function (config, defaults) {
  var _config = flattenWith('.', config);
  var _defaults = flattenWith('.', defaults);
  return explodeBy('.', _.defaults(_config, _defaults));
};

