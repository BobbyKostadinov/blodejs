/** @jsx React.DOM */

var AppPage = require('./../Pages/App/App.jsx'),
    Router  = require('react-router'),
    HelloWorldPage = require('./../Pages/HelloWorld/HelloWorld.jsx'),
    AboutPage = require('./../Pages/About/About.jsx'),
    Route = Router.Route, DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route handler={AppPage} path="/">
    <Route name="about" handler={AboutPage} path="/about"/>
    <DefaultRoute name="nav" handler={HelloWorldPage}/>
  </Route>
);


module.exports = function* (next) {
  var self = this;
  Router.run(routes, this.url, function (Handler) {
    var content = React.renderToString(<Handler/>);
    self.body = content;;
  });
  yield next;
};
