/** @jsx React.DOM */

var AppPage = require('./../pages/App/App.jsx'),
    Router  = require('react-router'),
    Route = Router.Route, DefaultRoute = Router.DefaultRoute;

var routes = AppPage.routes;

module.exports = function* (next) {
  var self = this;
  Router.run(routes, this.url, function (Handler) {
    var content = React.renderToString(
      React.createFactory(Handler)());
    self.body = content;
  });
  yield next;
};
