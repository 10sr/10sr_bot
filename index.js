#!/usr/bin/env node
const myName = "10sr_bot";

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

twitter.post("おやすみ " + new Date().toISOString());

twitter.on("userMessage", message => {
  handlers.handle(twitter, message);
});


var express = require("express")();
var pages = require("./pages/index.js");

pages.enable(express, twitter, "/10sr_bot");

express.listen(5000);
