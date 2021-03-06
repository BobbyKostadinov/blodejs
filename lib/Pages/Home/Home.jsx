var React = require('react'),
    Page = require('./../../models/page'),
    Home;

module.exports = Home = React.createClass({
  getInitialState: function() {
    var state = {headline: "Home", body: "Hello World HOME PAGE"};
    return state;
    //Crete an ajax call to a new resource fetching body parts then set state as per tutorial https://facebook.github.io/react/docs/tutorial.html
  },
  render: function () {
    return (

      <div className="content">
        <h2>
          {this.state.headline}
        </h2>
        {this.state.body}
      </div>
    );
  }
});
