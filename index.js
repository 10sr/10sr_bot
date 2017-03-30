#!/usr/bin/env node
const fs = require("fs");

const myName = "10sr_bot";

const gitVersion = fs.readFileSync("./git_version.txt", {
  encoding: "utf-8"
});

var Twitter = require("./twitter/index.js");
var handlers = require("./handlers/index.js");

var twitterTokens = {
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET,
  token: process.env.TWITTER_TOKEN,
  tokenSecret: process.env.TWITTER_TOKEN_SECRET
};

var twitter = new Twitter({
  consumer_key: twitterTokens.key,
  consumer_secret: twitterTokens.secret,
  access_token: twitterTokens.token,
  access_token_secret: twitterTokens.tokenSecret
});

twitter.post("おやすみ " +
             new Date().toISOString() +
             " git: " + gitVersion);

twitter.on("userMessage", message => {
  handlers.handle(twitter, message);
});

const postBearerToken = process.env.POST_BEARER_TOKEN;

var passport = require("passport");
var BearerStrategy = require("passport-http-bearer").Strategy;
var morgan = require("morgan");
var express = require("express")();

// curl -i -X POST -H "authorization: Bearer toen" -d "{}" http://localhost:5000/10sr_bot/post
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

var pages = require("./pages/index.js");

pages.enable(express, passport, twitter, {
  webRoot: "/10sr_bot"
});

express.listen(5000);
