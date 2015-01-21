module.exports = Zone;

function Zone()
{

}

Zone.prototype.render = function (zoneName) {

  var result = new Promise(function(fulfill) {
    fulfill(new Buffer('<div>' + zoneName + '</div'));
  });

  return result;
};
