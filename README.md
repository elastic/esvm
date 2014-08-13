esvm
====

**Elasticsearch Version Manager** is a command line application used for development to manage different versions of Elasticsearch. It should not be used in production since it's probably a bad idea to wrap a process with Node.js. But never the less it's extremely useful if you need to develop against multiple versions of Elasticsearch (I'm looking at you Kibana team).

## Installation
```
npm install esvm -g
```

### Usage
```
Usage: esvm [options] <version>

Options:

  -h, --help       output usage information
  -V, --version    output the version number
  -p, --purge      purge the data directory
  -f, --fresh      preform a fresh install
  -b, --branch     install from a branch release
  -n, --nodes <n>  the number of nodes to star
```

### Configuration

**esvm** will look for an .esvmrc file in the current working directory. If it doesn't find one there it will continue to walk up the directory tree until it does. There are two main sections for the configuration file:

* `defaults` - The defaults to apply to every instance
* `clusters` - The named clusters. See example

Both the defaults and named clusters will take the following options:

* `version`   - The semver statment for the released version of Elasticsearch to install (This will override branch and binary).
* `branch`    - The nightly branch to install
* `binary`    - The path to the tarball to use. This can either be URL or file path.
* `directory` - The directory where everything is installed. If the directory doesn't exist it will be created.
* `plugins`   - The plugins to install. This should be an array of plugin install directives.
* `purge`     - Purge the data directory when starting the server (Default: false).
* `fresh`     - Remove the current copy before installing a new copy (Default: false).
* `nodes`     - The number of nodes to start. This can either be a number or an array of config objects (1 per node)
* `config`    - The config to start the server with.

### Example .esvmrc

```json
{
  "defaults": {
    "plugins": ["elasticsearch/marvel/latest"]
  },
  "clusters": {
    "2node": {
      "branch": "master",
      "nodes": 2
    }
  }
}
```
