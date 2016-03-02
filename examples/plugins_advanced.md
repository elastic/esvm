This is an example that installs a number of Elasticsearch plugins at run time, with specific settings for the given plugins using objects instead of strings.

- Install latest available version of Elasticsearch
- Name node *es-shield*
- Install 3 plugins, including commercial Elastic plugin shield

Run as `esvm plugins`

Plugin objects can recieve one of the following:

`path` - The file location of the given plugin, can be a file path or URL
`staging` - Use the staged builds uploaded to S3
`snapshot` - Use internal SNAPSHOT builds (requires credentials in `.esvm_snapshot_credentials.json`)

```
{
  "clusters": {
    "plugins": {
      "nodes": [{
        "node": { "name": "es-shield" }
      }],
      "plugins": [
        "mobz/elasticsearch-head",
        { name: "license", "snapshot": true },
        { name: "shield", "snapshot": true }
      ]
    }
  }
}
```