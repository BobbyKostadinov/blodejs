// jshint esnext:true
var zone = require('./../../pretty/lib/zone');

module.exports = function* (next){
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
};
