var stub = require('sinon').stub,
    zoneStub = {
      render: function (zoneName) {
        return {
          then: function(cb) {cb(zoneName);}
        };
      }
    },
    proxyquire = require('proxyquire'),
    layout = proxyquire('./../lib/layout', {'./../../pretty/lib/zone': zoneStub}),
    should = require('should');


describe('Middleware Layout', function() {
  it('should add header and footer', function () {
    var self = {};
    var it = layout.apply(self);
    it.next();
    it.next();
    self.body.should.eql('headerfooter');
  });
});
