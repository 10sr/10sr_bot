module.exports = {
  command: "ping",
  handle: (twitter, args, message) => {
    twitter.replyTo(message, "うっさい");
  }
};
