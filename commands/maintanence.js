module.exports = function(controller, version, atts) {
  var fs = require('fs')
  var restart = false;


function changeStatus(newValue) {
  var filename = __dirname + "/../status.txt";

  fs.writeFileSync(filename, newValue, 'utf8');

}

function getStatus() {
  return fs.readFileSync(__dirname + "/../status.txt",'utf8').toString();
}

function restart() {
  process.exit(1);
}


var status = getStatus();
console.log(status);
  

if (process.env.studio_token) {

  if (status === "offline") {
    controller.hears(['!restart'], 'ambient', function(bot,message) {
  
  if (message.user === "U6N96HT1V" || message.user === "U6TF5AS90") {
    
    bot.say({
    "text" : "I'm back!",
    "channel":message.channel
  
    });
    
  changeStatus("online");
  setTimeout(function() {
    process.exit(1);
  }, 4000);
  
    
  }
}); 
    
  }
  
  else {
    controller.hears(['!shutdown'], 'ambient', function(bot,message) {
  
  if (message.user === "U6N96HT1V" || message.user === "U6TF5AS90") {
    
    bot.say({
    "text" : "Bot is currently down for maintenance. See you soon everyone!",
    "channel":message.channel
  
    });
    
  changeStatus("offline");
  setTimeout(function() {
    process.exit(1);
  }, 4000);
   
  } 
  
  else {
    bot.say({
    "text" : "Oops! You don't have permission to use this command.",
    "channel":message.channel
  
    });
    
  }
  
    
  });
                         
       
  }}}



