module.exports = {
  render: function (zoneName) {
    var result = new Promise(function(fulfill) {
      fulfill(new Buffer('<div>' + zoneName + '</div>'));
    });
    return result;
  }
};
