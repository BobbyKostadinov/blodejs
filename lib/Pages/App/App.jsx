/** @jsx React.DOM */
/* global window, document */

var React = require('react'),
    Router = require('react-router'),
    Nav = require('./../../components/Nav/Nav.jsx'),
    GoogleAnalytics = require('react-g-analytics'),
    App;
var RouteHandler = Router.RouteHandler

module.exports = App = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  render: function () {
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
              <GoogleAnalytics id="UA-62037840-1"/>
              <RouteHandler />
            </section>
          </div>
        </body>
      </html>
    );
  }
});
