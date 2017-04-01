module.exports = {
  path: "/status",
  method: "post",
  makeHandler: (twitter, config) => (req, res) => {
    var message = req.body.message;
    if (message) {
      twitter.post(message, {}, (err, data, response) => {
        res.json({
          message: message,
          twitter: {
            err: err,
            data: data,
            response: response
          }
        });
      });
    } else {
      process.nextTick(() => {
        res.json({
          err: "status is not given"
        })
      });
    }
  }
};
