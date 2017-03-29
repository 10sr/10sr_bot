#!/usr/bin/env node
const fs = require("fs");

const myName = "10sr_bot";

const gitCommitHash = fs.readFileSync("./git_commit_hash.txt", {
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
             " git: " + gitCommitHash.slice(0, 8));

twitter.on("userMessage", message => {
  handlers.handle(twitter, message);
});


var express = require("express")();
var pages = require("./pages/index.js");

pages.enable(express, twitter, {
  webRoot: "/10sr_bot"
});

express.listen(5000);
