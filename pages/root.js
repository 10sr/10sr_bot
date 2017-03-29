module.exports = {
  path: "/",
  method: "get",
  makeHandler: (twitter, config) => (req, res) => {
    res.send("Express UI!\n\n10sr_bot last message: " +
             (twitter.lastPostMessage || "(Not yet)"));
  }
};
