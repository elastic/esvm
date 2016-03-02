- Installs the [elasticsearch-head](https://mobz.github.io/elasticsearch-head/) plugin
  - plugin would be installed by default for any other clusters defined as well
- 5 total nodes
  - 2 Master Nodes
  - 3 Data nodes
- Cluster named *2m3d*

To load this configuration, run `esvm 2m3d`

```
{
  "clusters": {
    "2m3d": {
      "plugins": ["mobz/elasticsearch-head"]
      "nodes": [
        {
          "cluster": { "name": "2m3d" },
          "node": { "name": "master-1", "data": false, "master": true }
        },
        {
          "cluster": { "name": "2m3d" },
          "node": { "name": "master-2", "data": false, "master": true }
        },
        {
          "cluster": { "name": "2m3d" },
          "node": { "name": "data-1", "data": true, "master": false }
        },
        {
          "cluster": { "name": "2m3d" },
          "node": { "name": "data-2", "data": true, "master": false }
        },
        {
          "cluster": { "name": "2m3d" },
          "node": { "name": "data-3", "data": true, "master": false }
        }
      ]
    }
  }
}
```