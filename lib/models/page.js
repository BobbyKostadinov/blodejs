var fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    marked = require('marked'),
    Page;

module.exports = Page;

function Page (pageName) {
  var location = __dirname + '/../../data/';
  var pageData = {};
  var dataLoaded = false;

  var page = {};
  page.getParsedParts = function(parts) {
    return new Promise(function (resolve, reject) {
      var response = {};

      if (dataLoaded === true) {
        _.each(parts, function (part, partName) {
          response[partName] = marked(pageData[part]);
        });
        return resolve(pageData);
      }
      fs.readFile(path.join(location, pageName + '.json'), 'utf8', function (err, data) {
        if (err)  {
          return reject("Failed to read page content file");
        }
        pageData = data;
        dataLoaded = true;

        _.each(parts, function (partName) {
          response[partName] = marked(pageData[partName]);
        });

        resolve(response);
      });
    });
  };

  return page;
}
