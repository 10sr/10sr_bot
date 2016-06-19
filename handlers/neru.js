module.exports = {
  regexp: /./,
  mention: false,
  handle: (twitter, message) => {
    if (message.hashTags.indexOf("neru") >= 0) {
      twitter.mentionTo(message.user, "おやすみなさい");
    }
  }
};
