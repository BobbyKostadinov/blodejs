// jshint esnext:true
var chalk = require('chalk'),
    moment = require('moment');

module.exports = {
  info: function () {
    log('info', arguments);
  },
  warn: function () {
    log('warn', arguments);
  },
  err: function () {
    log('err', arguments);
  }

};


function log(severity, messages) {
  var logFunc,
      things = Array.prototype.slice.call(messages);
  switch (severity) {
    case "info":
      logFunc = chalk.white;
      break;
    case "warn":
      logFunc = chalk.yellow;
      break;
    case "err":
      logFunc = chalk.red;
      break;
  }

  things.forEach(function (thing) {
    console.log(
      '[' + chalk.gray(moment().format()) + ']',
      logFunc(thing)
    );
  });
}
