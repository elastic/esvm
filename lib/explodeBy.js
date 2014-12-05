var explodeBy = module.exports = function (dot, flatObject) {
  var _ = require('lodash');
  var fullObject = {};
  _.each(flatObject, function (value, key) {
    var keys = key.split(".");
    (function walk(memo, keys, value) {
      var _key = keys.shift();
      if (keys.length === 0) {
        memo[_key] = value;
      } else {
        if (!memo[_key]) memo[_key] = {};
        walk(memo[_key], keys, value);
      }
    })(fullObject, keys, value);
  });
  return fullObject;
};

