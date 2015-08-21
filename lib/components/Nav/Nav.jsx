var React = require('react'),
  Nav;

module.exports = Nav = React.createClass({
  render: function () {
    return (
      <ul className="nav nav-pills">
        <li role="presentation"><a href="/">Home</a></li>
        <li role="presentation" className="disabled"><a href="blog">Blog</a></li>
        <li role="presentation"><a href="/about">About</a></li>
        <li role="presentation"><a href="/portfolio">Portfolio</a></li>
    </ul>
    );
  }
});
