/** @jsx React.DOM */

var AppPage = require('./../pages/App/App.jsx'),
    Router  = require('react-router'),
    HomePage = require('./../pages/Home/Home.jsx'),
    AboutPage = require('./../pages/About/About.jsx'),
    Route = Router.Route, DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route handler={AppPage} path="/">
    <Route name="home" handler={HomePage} path="/"/>
    <Route name="about" handler={AboutPage} path="/about"/>
    <DefaultRoute name="default" handler={HomePage}/>
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
