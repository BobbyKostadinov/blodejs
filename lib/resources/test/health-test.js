var health = require('./../health'),
    should = require('should');

describe('Health Resource', function (){
  it('should return a function', function(done) {
    var iter = health(done);
    iter.should.be.a.Object;
    iter.next().value();
  });
});
