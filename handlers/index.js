var requireDir = require("require-dir");

var handlers = requireDir("./");
delete handlers["index"];

exports.handle = (twitter, message) => {
  for (var name in handlers) {
    if (!handlers[name].mention || message.isMentionToMe) {
      handlers[name].handle(twitter, message);
    }
  }
}
