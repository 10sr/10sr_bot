var twit = require("twit");

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
  t.post("statuses/update", {
    status: JSON.stringify(msg).slice(0, 130)
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
});
