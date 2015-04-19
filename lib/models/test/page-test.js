var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    should = require('should');

describe('Page', function (){
  var page, fsStubReset, Page, fsStub, noop = function() {};
  beforeEach(function () {
    fsStub = sinon.stub({readFile: noop});
    Page = proxyquire('./../page', {'fs': fsStub});
  });

  it('should getParsedPart', function(done) {
    fsStub.readFile.yields(null, {heading: "Test"});
    page = new Page('test');
    page.getParsedPart('heading').then(function(heading) {
      heading.should.eql("<p>Test</p>\n");
      done();
    }).catch(done);
  });

  it('should getParsedPart handle fs errors', function(done) {
    fsStub.readFile.yields("Error");
    page = new Page('test');
    page.getParsedPart('heading').catch(function(err) {
      done();
    });
  });

  it('should getParsedPart only use fs once', function(done) {
    fsStub.readFile.yields(null, {heading: "Test"});
    page = new Page('test');
    page.getParsedPart('heading').catch(done)
      .then(function(heading1) {
        page.getParsedPart('heading').catch(done)
          .then(function(heading2) {
              fsStub.readFile.calledOnce.should.be.ok;
              done();
          });
    });
  });

});
