/** @jsx React.DOM */
/* global window, document */
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route, DefaultRoute = Router.DefaultRoute,
    Nav = require('./../../components/Nav/Nav.jsx'),
    RouteHandler = Router.RouteHandler,
    HomePage = require('./../Home/Home.jsx'),
    AboutPage = require('./../About/About.jsx'),
    PortfolioPage = require('./../Portfolio/Portfolio.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render () {
    return (
      <html lang="en">
        <head>
          <title>{this.state.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css"
            href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="/assets/App.css" />
        </head>
        <body>
          <div className="container-fluid">
            <section className="container">
              <Nav />
            </section>
            <section className="container">
              <RouteHandler />
            </section>
          </div>
        </body>
      </html>
    );
  }
}
App.routes = (
  <Route handler={App} path="/">
    <Route name="home" handler={HomePage} path="/"/>
    <Route name="about" handler={AboutPage} path="/about"/>
    <Route name="portfolio" handler={PortfolioPage} path="/portfolio"/>
    <DefaultRoute name="default" handler={HomePage}/>
  </Route>
);


module.exports = App;
