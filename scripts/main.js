module.exports = function(robot){
  //robot.send({}, "おやすみ");
  robot.logger.info("Deploy done.");
  robot.respond(/ping/, function(res){
    res.send("うっさい");
  });
};
