var requireDir = require("require-dir");

var handlers = requireDir("./");
delete handlers.index;

exports.handle = (twitter, message) => {
  if (message.user === "10sr_bot") {
    return;
  }

  for (var name in handlers) {
    if ((!handlers[name].mention || message.isMentionToMe) &&
        message.text.match(handlers[name].regexp)) {
      handlers[name].handle(twitter, message);
    }
  }
}
