info = require('./../../package.json');

module.exports = function* (next) {
  var fs = require('fs');
  this.body = {
    status: 'ok',
    name: info.name,
    version: info.version
  };
  yield next;
};
