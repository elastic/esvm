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

    var plugins = [];

    // append plugins
    if (cluster.plugins) {
      cluster.plugins.forEach(function (plugin) {
        if (Object.prototype.toString.call(plugin) == '[object Object]') {
          var descriptor = plugin.staging ? 'staging' : plugin.path;
          plugins.push(plugin.name + ' - ' + descriptor);
        } else {
          plugins.push(plugin);
        }
      });
      output.push(plugins.join('\n'));
    }
    else output.push('');

    // append cluster row to table
    return table.push(output);
  });

  return table.toString();
}
