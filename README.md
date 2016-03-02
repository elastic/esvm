esvm
====

**Elasticsearch Version Manager** is a command line application used for development to manage different versions of Elasticsearch. It should not be used in production since it's probably a bad idea to wrap a process with Node.js. But nevertheless it's extremely useful if you need to develop against multiple versions of Elasticsearch (I'm looking at you Kibana team).

## Installation
```
npm install esvm -g
```

### Usage
```
Usage: esvm [options] <version>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -p, --purge            purge the data directory
    -f, --fresh            preform a fresh install
    -b, --branch           install from a branch release
    -n, --nodes <n>        the number of nodes to start
    -c, --config <file>    the config file to use
    -l, --list             list clusters in the config file
    --cluster-name <name>  the cluster name to use
```

Note: `<version>` can either be a semver expression of a named cluster (which is found in the configuration).

### Configuration

**esvm** will look for an .esvmrc file in the current working directory. If it doesn't find one there it will continue to walk up the directory tree until it does. There are two main sections for the configuration file:

* `defaults` - The defaults to apply to every instance
* `clusters` - The named clusters

Both the defaults and named clusters will take the following options:

Option        | Description
------------- | -----------
`version`     | The semver statment for the released version of Elasticsearch to install. Will override branch and binary options, and install the latest version by default
`branch`      | The nightly branch to install
`binary`      | The path to the tarball to use. This can either be URL or file path.
`directory`   | The directory where everything is installed. If the directory doesn't exist it will be created. (Default: ~/.esvm)
`plugins`     | The plugins to install. This should be an array of plugin install directives.
`purge`       | Purge the data directory when starting the server (Default: false).
`fresh`       | Remove the current copy before installing a new copy (Default: false).
`nodes`       | The number of nodes to start. This can either be a number or an array of config objects (Default: 1)
`config`      | The config to start the server with.
`shield`      | Configuration settings for Shield. Check the examples for help

For some example configurations, please consult the [example files](https://github.com/simianhacker/esvm/tree/master/examples)
