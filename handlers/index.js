exports.handle = (twitter, message) => {
  if (message.text.indexOf("ping") >= 0 &&
      message.mentions.indexOf("10sr_bot") >= 0) {
    twitter.post("@" + message.user + " pong");
  }
}
