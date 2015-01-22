// jshint esnext
var mount = require('koa-mount');
    koa = require('koa');
    blog = require('./lib/blog/lib/app.js');
    server = koa(),
    middleware = require('./lib/middleware/lib/loader');

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

middleware.attach(server, './layout').then (function (server) {
  server.use(mount('/blog', blog.init()));
  server.listen(8888);
})
  .catch(function(err) { console.log(err) });
