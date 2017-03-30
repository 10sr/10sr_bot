var router = require("express").Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var requireDir = require("require-dir");

var pages = requireDir("./");
delete pages.index;

// http://stackoverflow.com/questions/15388206/sending-back-a-json-response-when-failing-passport-js-authentication#34699181
// Return error as json object
function _handlePostError(err, req, res, next){
  var output = {
    error: {
      name: err.name,
      message: err.message,
      text: err.toString()
    }
  };

  var statusCode = err.status || 500;
  res.status(statusCode).json(output)
}

router.use([_handlePostError]);

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
        passport.authenticate("bearer", {
          session: false,
          failWithError: true
        }),
        jsonParser,
        pages[name].makeHandler(twitter, config),
        (err, req, res, next) => {
          return res.json(err);
        }
      );
    }
  }
};
