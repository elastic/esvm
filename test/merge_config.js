var config = require('./fixtures/config.json');
var defaults = require('./fixtures/defaults.json');
var expect = require('chai').expect;
var mergeConfig = require('../lib/mergeConfig');
describe('mergeConfig', function () {
  it('should merge config recursivly', function () {
    expect(mergeConfig(config, defaults))
      .to.eql({
        config: {
          'test.enable': true,
          'example.foo.enable': true,
          'test.hosts': ['localhost:9200']
        },
        cluster: {
          node: {
            enable: true,
            name: 'foo-bar',
            '.index': ['something']
          }
        }
      });
  });
});
