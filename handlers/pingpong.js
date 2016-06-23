module.exports = {
  regexp: /\sping$/,
  mention: true,
  handle: (twitter, message) => {
    twitter.replyTo(message, "うっさい");
  }
};
