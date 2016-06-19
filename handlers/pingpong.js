module.exports = {
  regexp: /ping/,
  mention: true,
  handle: (twitter, message) => {
    twitter.post("@" + message.user + " pong!");
  }
};
