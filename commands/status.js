module.exports = function(controller, version, atts) {
  controller.hears(['!status'], 'ambient', function(bot,message) {
    var fs = require('fs');
    var teams = fs.readFileSync(__dirname + '/../teamdir.txt', 'utf8');
    var listOfTeams = teams.split('\n');
    bot.say({
      "text" : "I'm currently serving *" + (listOfTeams.length - 1) + "* teams. Tell other FTC teams you know about me to help me serve more teams!",
      "channel" : message.channel
      
    });
    
    


});
};
