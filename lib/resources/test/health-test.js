var health = require('./../health'),
    should = require('should');

describe('Health Resource', function (){
  it('should return a function', function() {
    var it = health();
    it.should.be.a.Object;
    it.next();
    it.next().done.should.be.ok;

  });

});
