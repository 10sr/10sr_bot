module.exports = {
  path: "/post",
  method: "post",
  makeHandler: (twitter, config) => (req, res) => {
    console.log(JSON.stringify(req.body));
    res.json(req.body);
  }
};
