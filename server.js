// jshint esnext
var mount = require('koa-mount');
    koa = require('koa');
    blog = require('./lib/blog/lib/app.js');
    server = koa(),
    zone = require('./lib/pretty/lib/zone');

// Headers
server.use(function *(next){
    this.set('X-Powered-By', 'blodejs');
    yield next;
});

// logger
server.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    console.log('%s %s - %s', this.method, this.url, ms);
});

server.use(function* (next){
  var self = this;
  self.body = '';
  zone.render('header').then(function(htmlBuffer) {
    console.log('rendering the header');
    self.body += htmlBuffer.toString();
  });
  yield next;

  zone.render('footer').then(function(htmlBuffer) {
    console.log('rendering the footer');
    self.body += htmlBuffer.toString();
  });
});

server.use(mount('/blog', blog.init()));


server.listen(8888);
