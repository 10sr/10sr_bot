const myName = "10sr_bot";

var twit = require("twit");
var isarray = require("isarray");

var twitterTokens = {
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET,
  token: process.env.TWITTER_TOKEN,
  tokenSecret: process.env.TWITTER_TOKEN_SECRET
};

var t = new twit({
  consumer_key: twitterTokens.key,
  consumer_secret: twitterTokens.secret,
  access_token: twitterTokens.token,
  access_token_secret: twitterTokens.tokenSecret
});

t.post("statuses/update", {
  status: 'おやすみ ' + new Date().toString()
}, function(err, data, response){
  if (err) {
    console.log(err.toString());
  }
  if (data) {
    console.log(data.toString());
  }
  if (response) {
    console.log(response.toString());
  }
});

var tl = t.stream("user", {});

tl.on("message", function(msg){
  console.log(JSON.stringify(msg));
  if (! msg.text) {
    return;
  }

  if (isMentionToMe(msg)) {
  var args = msg.text.split(" ");
    if (args.indexOf("ping") >= 0) {
      t.post("statuses/update", {
        status: "@" + msg.user.name + " pong"
      }, function(err, data, response){
        if (err) {
          console.log(err.toString());
        }
        if (data) {
          console.log(data.toString());
        }
        if (response) {
          console.log(response.toString());
        }
      })
    }
  }

  // t.post("statuses/update", {
  //   status: JSON.stringify(msg).slice(0, 130)
  // }, function(err, data, response){
  //   if (err) {
  //     console.log(err.toString());
  //   }
  //   if (data) {
  //     console.log(data.toString());
  //   }
  //   if (response) {
  //     console.log(response.toString());
  //   }
  // })
});

function isMentionToMe(msg){
  if (!msg.entities) {
    return false;
  }

  if (!isarray(msg.entities.user_mentions)) {
    return false;
  }

  for (var i = 0; i < msg.entities.user_mentions.length; i++) {
    if (msg.entities.user_mentions[i].name === myName) {
      return true;
    }
  }
  return false;
}
