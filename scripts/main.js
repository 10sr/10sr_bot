module.exports = function(robot){
  //robot.send({}, "おやすみ");
  robot.log.info("Deploy done.");
  robot.respond(/ping/, function(res){
    res.send("うっさい");
  });
};
