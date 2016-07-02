var requireDir = require("require-dir");

var pages = requireDir("./");
delete handlers.index;

exports.enable = (express, twitter) => {
  for (var name in pages) {
    express.get(pages[name].path, pages[name].makeHandler(twitter));
  }
};
