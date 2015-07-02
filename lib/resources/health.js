info = require('./../../package.json');

module.exports = function* (next) {
  console.log('asdasd');
  this.body = {
    status: 'ok',
    name: info.name,
    version: info.version
  };
  yield next;
};
