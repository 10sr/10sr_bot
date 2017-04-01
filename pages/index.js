var jsonParser = require("body-parser").json();
var passport = require("passport");
var BearerStrategy = require("passport-http-bearer").Strategy;
var morgan = require("morgan");

var express = require("express")();

var requireDir = require("require-dir");

var pages = requireDir("./");
delete pages.index;

exports.start = (twitter, config) => {
  var webRoot = config.webRoot || "";
  var postBearerToken = config.postBearerToken;
  var port = config.port || 5000;


  // curl -i \
  //   -X POST \
  //   -H "Authorization: Bearer toen" \
  //   -d '{ "message": "hell world!" }' \
  //   -H "Content-Type: application/json" \
  //   http://localhost:5000/10sr_bot/post
  // みたいな感じ
  passport.use(new BearerStrategy((token, cb) => {
    if (token === postBearerToken) {
      return cb(null, { user: "default" }, { scope: "rw" });
    } else {
      return cb(null, false, {
        message: "Bearer Unauthorized"
      });
    }
  }));

  express.use(morgan("combined"));


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
    res.status(statusCode).json(output);
  }

  require("express").Router().use([_handlePostError]);


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

  express.listen(port);
};
