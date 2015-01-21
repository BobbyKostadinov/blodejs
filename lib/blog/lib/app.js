// jshint esnext:true
var koa = require('koa'),
    ZoneRenderer = require('./../../pretty/lib/zone');

module.exports = App;


function App(){
  var blogApp = new koa();
  var zone = new ZoneRenderer();
  console.log('initializing the blog');

  blogApp.use(function* (next) {
    var start = new Date();
    yield next;
    console.log('Rendering blog: ' + (new Date() - start) + 'ms');
  });

  blogApp.use(function* (next){
    var self = this;
    self.body = '';
    var renderer = zone.render('footer');
    yield next;
    renderer.then(function(htmlBuffer) {
      console.log('rendering the footer');
      self.body += htmlBuffer.toString();
    })
  });

  blogApp.use(function* (next){
    var self = this;
    self.body = '';
    var renderer = zone.render('body');
    yield next;
    renderer.then(function(htmlBuffer) {
      console.log('rendering the body');
      self.body += htmlBuffer.toString();
    })
  });

  blogApp.use(function* (next){
    var self = this;
    var renderer = zone.render('header');
    yield next;
    renderer.then(function(htmlBuffer) {
      console.log('rendering the header');
      self.body += htmlBuffer.toString();
    })
  });


  blogApp.use(function* (){

  });


  return blogApp;
}
