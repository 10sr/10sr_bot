module.exports = {
  regexp: /ping/,
  mention: true,
  handle: (twitter, message) => {
    twitter.replyTo(message, " pong!");
  }
};
