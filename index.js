#!/usr/bin/env node

const assert = require("assert");

assert(process.env.POST_BEARER_TOKEN, "POST_BEARER_TOKEN is undefined");
assert(process.env.TWITTER_KEY, "TWITTER_KEY is undefined");
assert(process.env.TWITTER_SECRET, "TWITTER_SECRET is undefined");
assert(process.env.TWITTER_TOKEN, "TWITTER_TOKEN is undefined");
assert(process.env.TWITTER_TOKEN_SECRET, "TWITTER_TOKEN_SECRET is undefined");

const postBearerToken = process.env.POST_BEARER_TOKEN;
const twitterTokens = {
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET,
  token: process.env.TWITTER_TOKEN,
  tokenSecret: process.env.TWITTER_TOKEN_SECRET
};

const fs = require("fs");

const myName = "10sr_bot";

const gitVersion = fs.readFileSync("./git_version.txt", {
  encoding: "utf-8"
});

var Twitter = require("./twitter/index.js");
var handlers = require("./handlers/index.js");

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


var pages = require("./pages/index.js");

pages.start(twitter, {
  webRoot: "/10sr_bot",
  postBearerToken: postBearerToken,
  port: 5000
});
