module.exports = {
  regexp: /echo /,
  mention: true,
  handle: (twitter, message) => {
    var text = message.text.match(/echo (.*)/)[1];
    twitter.replyTo(message, text);
  }
};
