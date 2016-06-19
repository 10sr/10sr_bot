exports.handle = (twitter, message) => {
  if (message.isMentionToMe && message.text.indexOf("ping") >= 0) {
    twitter.post("@" + message.user + " pong");
  }
}
