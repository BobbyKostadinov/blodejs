var fs = require('fs'),
    path = require('path'),
    marked = require('marked'),
    Page;

module.exports = Page;

function Page (pageName) {
  var location = __dirname + '/../../data/';
  var pageData = {loaded:false};

  var page = {};
  page.getParsedPart = function(part) {
    return new Promise(function (resolve, reject) {
      if (pageData.loaded === true) {
        return resolve();
      }
      fs.readFile(path.join(location, pageName + '.json'), 'utf8', function (err, data) {
        if (err)  {
          return reject("Failed to read page content file");
        }
        pageData = data;
        pageData.loaded = true;
        resolve(marked(pageData[part]));
      });
    });
  };

  return page;
}
