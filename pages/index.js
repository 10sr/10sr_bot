var requireDir = require("require-dir");

var pages = requireDir("./");
delete pages.index;

exports.enable = (express, twitter, base_path) => {
  for (var name in pages) {
    express.get(base_path + pages[name].path, pages[name].makeHandler(twitter));
  }
};
