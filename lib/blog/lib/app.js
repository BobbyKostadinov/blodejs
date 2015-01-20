// jshint esnext:true
var koa = require('koa');

module.exports = App;


function App(){
  var blogApp = new koa();

  blogApp.use(function* (){
    this.body = 'Hello World To My Blog';
    yield {};
  });

  console.log('initializing the blog');
  return blogApp;
}
