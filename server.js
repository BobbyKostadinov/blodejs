require('node-jsx').install({extension: '.jsx', harmony: true});

var compression = require('compression'),
    serveStatic = require('koa-static'),
    errors = require('common-errors'),
    PORT = process.env.PORT || 8888,
    IS_PROD = 'production' === process.env.NODE_ENV,
    mount = require('koa-mount');
    React = require('react'),
    koaBunyanLogger = require('koa-bunyan-logger'),
    Page = require('./lib/resources/page.js'),
    router = require('koa-router')();
    app = module.exports = require('koa')();


//Init logger
app.use(koaBunyanLogger());
app.use(koaBunyanLogger.requestIdContext());
app.use(koaBunyanLogger.timeContext());

app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
  this.log.info('%s %s for %s; duration: %sms', this.request.method, this.request.ip, this.path, ms);
});

//Set cache headers
app.use(function *(next) {
  this.set('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT');
  this.set('Cache-Control', 'no-store, ' + 'no-cache, must-revalidate, max-age=0');
  this.set('Pragma', 'no-cache');
  yield next;
});


app.use(function *(next) {
   compression();
   yield next;
});

app.use(mount('/assets', serveStatic(__dirname + '/dist')));
app.use(mount('/public', serveStatic(__dirname + '/public')));

router.get('/favicon.ico', function *(next) {
  this.body = '';
  yield next;
});

router.get('/_health', require('./lib/resources/health'));

router.get('/*', Page);


app
  .use(router.routes());

if (!module.parent) {
  app.listen(PORT, function () {
    console.log('on :%s', PORT);
  });
}
