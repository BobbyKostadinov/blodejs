info = require('./../../package.json');

module.exports = function* (next) {
  this.body = {
    status: 'ok',
    name: info.name,
    version: info.version
  };
  yield next;
};
