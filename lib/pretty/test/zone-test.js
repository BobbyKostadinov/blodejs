var zone = require('./../lib/zone'),
    should = require('should');

describe('pretty.layout', function() {

  it('should render return buffer', function (done) {
    var renderer = zone.render('header');
    renderer.then(function(html) {
      html.should.be.a.Buffer;
      done();
    });
  });

});
