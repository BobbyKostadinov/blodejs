var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    should = require('should');

describe('Page', function (){
  var page, fsStubReset, Page, fsStub, noop = function() {};
  beforeEach(function () {
    fsStub = sinon.stub({readFile: noop});
    Page = proxyquire('./../page', {'fs': fsStub});
  });

  it('should getParsedParts get part', function(done) {
    fsStub.readFile.yields(null, {heading: "Test"});
    page = new Page('test');
    page.getParsedParts(['heading']).then(function(parts) {
      parts.heading.should.eql("<p>Test</p>\n");
      done();
    }).catch(done);
  });

  it('should getParsedPart handle fs errors', function(done) {
    fsStub.readFile.yields("Error");
    page = new Page('test');
    page.getParsedParts(['heading']).catch(function(err) {
      done();
    });
  });

  it('should getParsedParts only use fs once', function(done) {
    fsStub.readFile.yields(null, {heading: "Test"});
    page = new Page('test');
    page.getParsedParts(['heading']).catch(done)
      .then(function(heading1) {
        page.getParsedParts(['heading']).catch(done)
          .then(function(heading2) {
              fsStub.readFile.calledOnce.should.be.ok;
              done();
          });
    });
  });

});
