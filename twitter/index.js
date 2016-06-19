var Message = require("./message.js");

var Twit = require("twit");

var EventEmitter = require("events");

class Twitter extends EventEmitter {
  constructor(options){
    super();
    this._twit = new Twit(options);
    this._userStream = this._twit.stream("user", {});

    this._userStream.on("message", msg => {
      this.emit("userMessage", new Message(msg));
    });
  }

  post(text){
    this._twit.post("statuses/update", {
      status: text
    }, function(err, data, response){
    });
  }
}

module.exports = Twitter;
