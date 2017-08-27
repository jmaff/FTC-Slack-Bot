module.exports = function(controller, version, atts) {
  controller.hears(['!feedback'], 'ambient', function(bot,message) {
    
    bot.say({
    "attachments" : atts.feedback(version),
      "channel":message.channel
  
    });
  });
};