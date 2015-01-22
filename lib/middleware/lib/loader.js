var _ = require('lodash');

module.exports = {
  attach: function (app, functionName) {

    return new Promise(function (fulfill, reject) {
        if (_.isUndefined(app) === true) {
          return reject('Loader called with no app');
        }
        loader(functionName)
          .then(function (func) { app.use(func); fulfill(app);})
          .catch(function (err) { reject(err) })
    });
  }
};

var loader = function (functionName) {
  return new Promise(function(fulfill, reject) {
    try{
      var func = require(functionName);
      return fulfill(func);
    }
    catch (err) {
      return reject(err);
    }
  });
};
