Custom Elasticsearch configurations, which would normally be placed in the `elasticsearch.yml` file.

This also shows the power of `defaults` in a configuration, as all of these Elasticsearch settings would be applied to any and all cluster configurations, and optionally overwritten as needed. The dot syntax is preferred, but deep object syntax would also work.

Run as `esvm config`

```
{
  "defaults": {
    "config": {
      "http.host": "0.0.0.0",
      "http.cors.enabled": true,
      "discovery.zen.ping.multicast.enabled": false,
      "bootstrap.mlockall": true
    }
  }
}
```