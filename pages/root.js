module.exports = {
  path: "/",
  makeHandler: (twitter) => (req, res) => {
    res.send("Express UI!");
  }
};
