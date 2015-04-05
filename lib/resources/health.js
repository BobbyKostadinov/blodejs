info = require('./../../package.json');

module.exports = function* (next) {
  var fs = require('fs');
  this.body = fs.readdirSync(__dirname + '/../../dist');
  // this.body = {
  //   status: 'ok',
  //   name: info.name,
  //   version: info.version
  // };
  yield next;
};
