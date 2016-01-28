var Table = require('cli-table');
var _ = require('lodash');

function formatPlugins(plugin) {
  if (_.isPlainObject(plugin)) return plugin.name;
  return plugin;
}

module.exports = function (clusters) {
  var table = new Table({
    head: ['Cluster Name', 'Version', 'Plugins']
  });

  var clusterNames = Object.keys(clusters);
  clusterNames.forEach(function (clusterName) {
    var cluster = clusters[clusterName];

    // append cluster name
    var output = [clusterName];

    // append branch/version
    if (cluster.branch) output.push(cluster.branch + ' branch');
    else if (cluster.version) output.push('v' + cluster.version);
    else output.push('n/a');

    // append plugins
    if (cluster.plugins) output.push(cluster.plugins.map(formatPlugins).join(','));
    else output.push('');

    // append cluster row to table
    return table.push(output);
  });

  return table.toString();
}
