var requireDir = require("require-dir");

var pages = requireDir("./");
delete pages.index;

exports.enable = (express, twitter, config) => {
  var webRoot = config.webRoot || "";
  for (var name in pages) {
    express.get(webRoot + pages[name].path, pages[name].makeHandler(twitter));
  }
};
