#!/usr/bin/env node
var libesvm     = require('libesvm');
var clc         = require('cli-color');
var moment      = require('moment');
var _           = require('lodash');
var ProgressBar = require('progress');
var RcLoader    = require('rcloader');
var os          = require('os');
var commander   = require('commander');
var packageInfo = require('../package.json');

var rcloader = new RcLoader('.esvmrc');
var config = rcloader.for('.esvmrc');

var defaults = _.defaults(config.defaults, {
  directory: process.env.HOME+'/.esvm',
  plugins: [],
  purge: false, // Purge the data directory
  fresh: false, // Download a fresh copy
  nodes: 1,
  config: {
    cluster: { name: os.hostname() }
  }
});

var levels = {
  INFO: clc.green,
  DEBUG: clc.cyan,
  WARN: clc.yellow,
  FATAL: clc.magentaBright,
  ERROR: clc.white.bgRed
};


commander
	.version(packageInfo.version)
	.usage('[options] <version>')
	.option('-p, --purge', 'purge the data directory')
	.option('-f, --fresh', 'preform a fresh install')
	.option('-b, --branch', 'install from a branch release')
	.option('-n, --nodes <n>', 'the number of nodes to start', parseInt)
	.parse(process.argv);

var version = commander.args[0];
var options = {};

// If the version is a named config use that otherwise
// use the version as the actual version
if (version) {
	if (config.clusters[version]) {
		options = config.clusters[version];
	} else if (commander.branch) {
		delete defaults.version;
		options = { branch: version }
	} else {
		options = { version: version };
	}
}

// If we don't have a version,  branch, and  binary then we need to set the version
// to the latest.
if (!options.version && !options.branch && !options.binary) {
  options.version = '*';
}

// Assign the overrides from the CLI options
_.assign(options, _.pick(commander, ['fresh', 'nodes', 'purge']));

// Set the defaults
options = _.defaults(options, defaults);
var cluster = libesvm.createCluster(options);

// Setup the logging
cluster.on('log', function (log) {
  var bar, pattern;
  if (log.type === 'progress') {
    pattern = log.op + ' [:bar] :percent :etas';
    bar = new ProgressBar(pattern, {
      complete: '=',
      incomplete: ' ',
      width: 80,
      clear: true,
      total: log.total
    });
    log.on('progress', _.bindKey(bar, 'tick'));
    return;
  }
  var level = levels[log.level] || function (msg) { return msg; };
  var message = clc.blackBright(moment(log.timestamp).format('lll'));
  message += ' '+level(log.level);
  if (log.node) {
    message += ' ' + clc.magenta(log.node);
  }
  message += ' ' + clc.yellow(log.type) + ' ';
  message += log.message;
  console.log(message);
});

// Install and then start the cluster
cluster.install().then(function () {
 return cluster.installPlugins();
}).then(function () {
 return cluster.start();
}).then(function () {
  process.on('SIGINT', function () {
    cluster.shutdown().then(function () {
      console.log(clc.black.bgWhite("Bye Bye!"));
      process.exit();
    });
  });
  process.stdin.read();
}).catch(function (err) {
 console.log('Oops', err.stack);
});
