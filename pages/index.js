var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var requireDir = require("require-dir");

var pages = requireDir("./");
delete pages.index;

exports.enable = (express, passport, twitter, config) => {
  var webRoot = config.webRoot || "";
  for (var name in pages) {
    if (pages[name].method === "get") {
      express.get(
        webRoot + pages[name].path,
        pages[name].makeHandler(twitter, config)
      );
    }
    if (pages[name].method === "post") {
      express.post(
        webRoot + pages[name].path,
        passport.authenticate("bearer", { session: false }),
        jsonParser,
        pages[name].makeHandler(twitter, config)
      );
    }
  }
};
