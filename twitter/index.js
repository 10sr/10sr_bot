var Message = require("./message.js");

var Twit = require("twit");
var shallowCopy = require("shallow-copy");

var EventEmitter = require("events");

class Twitter extends EventEmitter {
  constructor(options){
    super();
    this.lastPostMessage = null;
    this._twit = new Twit(options);
    this._userStream = this._twit.stream("user", {});

    this._userStream.on("message", msg => {
      this.emit("userMessage", new Message(msg));
    });

    this._userStream.on("error", err => {
      console.log(err.toString())
    })
  }

  post(text, params = {}){
    params = shallowCopy(params || {});
    params.status = text;
    this._twit.post("statuses/update", params, (err, data, response) => {
      if (err) {
        console.log(err.toString());
        return;
      }
      this.lastPostMessage = text;
    });
  }

  mentionTo(user, text){
    if (user) {
      this.post("@" + user + " " + text);
    }
  }

  replyTo(message, text){
    if (message && message.user) {
      var params = {};
      if (message.id) {
        params.in_reply_to_status_id = message.id;
      }
      this.post("@" + message.user + " " + text, params);
    }
  }
}

module.exports = Twitter;
