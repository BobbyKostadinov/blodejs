var noop = function () {},
    stub = require('sinon').stub,
    proxyquire = require('proxyquire'),
    chalk = stub({
      white: noop,
      red: noop,
      yellow: noop,
      gray: noop
    }),
    logger = proxyquire('./../lib/logger', {'chalk': chalk}),
    should = require('should');

describe('Logger', function() {
  var oldLog;
  beforeEach(function() {
    chalk.gray.reset();
  });
  before(function(){
    oldLog = console.log;
    console.log = noop;
  });
  after(function(){
    console.log = oldLog;
  });
  it('should info', function () {
    logger.info('Simple test');
    chalk.gray.calledOnce.should.be.ok;
    chalk.white.calledOnce.should.be.ok;
  });
  it('should warn', function () {
    logger.warn('Simple test');
    chalk.gray.calledOnce.should.be.ok;
    chalk.yellow.calledOnce.should.be.ok;
  });
  it('should err', function () {
    logger.err('Simple test');
    chalk.gray.calledOnce.should.be.ok;
    chalk.red.calledOnce.should.be.ok;
  });
});
