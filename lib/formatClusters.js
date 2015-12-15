var Table = require('cli-table');

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
    if (cluster.plugins) output.push(cluster.plugins.join(','));
    else output.push('');

    // append cluster row to table
    return table.push(output);
  });

  return table.toString();
}