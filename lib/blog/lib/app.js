// jshint esnext:true
var koa = require('koa'),
    zone = require('./../../pretty/lib/zone');

module.exports = {
  init: function () {
    var blogApp = new koa();

    console.log('initializing the blog');

    /* istanbul ignore next */
    blogApp.use(function* (next) {
      this.set('Content-type', 'text/html');
      yield next;
    });

    /* istanbul ignore next */
    blogApp.use(function* (next) {
      var start = new Date();
      yield next;
      console.log('Rendering blog: ' + (new Date() - start) + 'ms');
    });

    /* istanbul ignore next */
    blogApp.use(function* (next){
      var self = this;
      self.body = '';
      var renderer = zone.render('body').then(function(htmlBuffer) {
        console.log('rendering the body');
        self.body += htmlBuffer.toString();
      });
      yield next;
    });

    /* istanbul ignore next */
    blogApp.use(function* (){
      yield {};
    });


    return blogApp;
  }
};
