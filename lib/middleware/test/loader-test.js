var middleware = require('./../lib/loader');

describe('Middleware Loader', function () {
  it('should attach function to an app', function(done) {
    var noop = function() {};
    var app = {
      use: noop
    };
    middleware.attach(app, 'should').then(function(app) {done();});
  });

  it('should attach function catch error when app is missing', function(done) {
    middleware.attach().catch(function() {
      done();
    });
  });

  it('should attach function reject when function invalid', function(done) {
    var app = {
      use: function(func) {
        done('should not reach this point');
      }
    };
    middleware.attach(app, 'I do not exist').catch(function() {
      done();
    });
  });
});
