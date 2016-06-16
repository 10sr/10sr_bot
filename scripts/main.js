module.exports = function(robot){
  //robot.send({}, "おやすみ");
  robot.respond(/ping/, function(res){
    res.send("うっさい");
  });
};
