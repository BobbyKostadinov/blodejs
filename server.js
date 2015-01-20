// jshint esnext
var mount = require('koa-mount');
    koa = require('koa');
    Blog = require('./lib/blog/lib/app.js');
    server = koa();

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


server.use(mount('/blog', new Blog()));

server.use(function *() {
  console.log('we should not be here yet. going away');
  this.redirect(('/blog'));
});

server.listen(8888);
