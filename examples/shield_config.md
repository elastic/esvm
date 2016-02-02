Installs the [Shield plugin](https://www.elastic.co/products/shield), configuring users and roles for Kibana

- Cluster with 3 nodes
- Latest verison of Elasticsearch
- Installs Shield and required license companion
- Add 3 users to Shield

Run as `esvm sield`

```
{
  "clusters": {
    "shield": {
      "directory": "/home/vagrant/elasticsearch/es-with-plugins",
      "nodes": 3,
      "plugins": [
        "license",
        "shield"
      ],
      "shield": {
        "users": [
          {
            "username": "kibana",
            "password": "notsecure",
            "roles": ["kibana4_server"]
          },
          {
            "username": "user",
            "password": "notsecure",
            "roles": ["kibana4", "marvel_user"]
          },
          {
            "username": "admin",
            "password": "notsecure",
            "roles": ["admin"]
          }
        ]
      }
    },
  }
}
```