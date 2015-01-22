var app = require ('./../lib/app'),
    should = require('should');

describe ('app', function () {
  it ('should have init method', function () {
    app.init.should.be.a.Function;
    var blogApp = app.init();
    blogApp.should.be.an.Object;
  });
});
