var middleware = require('./../lib/loader');

describe('Middleware Loader', function () {
  it('should attach function to an app', function(done) {
    var noop = function() {};
    var app = {
      use: noop
    };
    middleware.attach(app, 'random').then(done);
  });

  it('should attach function catch error when app is missing', function(done) {
    var app = {
      use: function(func) {
        done('should not reach this point');
      }
    };
    middleware.attach().catch(function() {
      done();
    });
  });
});
