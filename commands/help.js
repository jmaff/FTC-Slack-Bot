module.exports = function(controller, version, atts) {
  controller.hears(['!help'], 'ambient', function(bot,message) {
    
    bot.say({
      text:":mailbox: Check your DMs!",
      channel:message.channel
    })
  // start a conversation to handle this response.
  bot.startPrivateConversation(message,function(err,convo) {
    
    convo.say(atts.help(version));

  

  });


});
};