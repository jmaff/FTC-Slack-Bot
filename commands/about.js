module.exports = function(controller, version, atts) {
  controller.hears(['!about'], 'ambient', function(bot,message) {
    
    bot.say({
    "attachments" : atts.about(version),
      "channel":message.channel
  
    });
  });
};