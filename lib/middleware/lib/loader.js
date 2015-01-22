var _ = require('lodash');

module.exports = {
  attach: function (app, functionName) {

    return new Promise(function (fulfill, reject) {
        if (_.isUndefined(app) === true) {
          return reject('Loader called with no app');
        }
        app.use(functionName);
        fulfill();
    });
  }
};
