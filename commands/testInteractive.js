module.exports = function(controller, version, atts) {

    controller.on('interactive_message_callback', function(bot, message) {
      var attachments = [];
      var rules = require(__dirname + '/../plugins/rules.js');
      
      console.log("actions: " + message.actions.actions);

    // check message.actions and message.callback_id to see what action to take...
    
    bot.replyInteractive(message, {
        text: '...',
        attachments:  [
            {
                text: "something"
            }
          ]
    });
    });
};
                


