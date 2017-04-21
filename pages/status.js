module.exports = {
  path: "/status",
  method: "post",
  makeHandler: (twitter, config) => (req, res) => {
    var message = req.body.message;
    if (!message) {
      process.nextTick(() => {
        res.json({
          meta: {
            status: 400,
            errorCode: "BAD_REQUEST",
            errorMessage: "status is not given"
          }
        })
      });
      return;
    }

    twitter.post(message, {}, (err, data, response) => {
      if (err) {
        res.json({
          meta: {
            status: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            errorMessage: "Error from twitter: " + err.toString()
          }
        })
        return;
      }
      res.json({
        meta: {
          status: 200
        },
        data: {
          message: message,
          returned: {
            data: data,
            response: response
          }
        }
      });
    });
  }
};
