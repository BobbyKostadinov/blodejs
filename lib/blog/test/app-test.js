var App = require ('./../lib/app'),
    should = require('should');
describe ('app', function () {
  it ('should init the blog', function (done) {
    var app = new App();
    should.exist(app);
    done();
  });
});
