var env = require('node-env-file');
env(__dirname + '/.env');


if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  console.log('Error: Specify clientId clientSecret and PORT in environment');
  process.exit(1);
}

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    // debug: true,
    scopes: ['bot'],
    studio_token: process.env.studio_token,
    studio_command_uri: process.env.studio_command_uri
};

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (process.env.MONGO_URI) {
    var mongoStorage = require('botkit-storage-mongo')({mongoUri: process.env.MONGO_URI});
    bot_options.storage = mongoStorage;
} else {
    bot_options.json_file_store = __dirname + '/.data/db/'; // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options);

controller.startTicking();

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Set up a simple storage backend for keeping a record of customers
// who sign up for the app via the oauth
require(__dirname + '/components/user_registration.js')(controller);

// Send an onboarding message when a new team joins
require(__dirname + '/components/onboarding.js')(controller);

// no longer necessary since slack now supports the always on event bots
// // Set up a system to manage connections to Slack's RTM api
// // This will eventually be removed when Slack fixes support for bot presence
// var rtm_manager = require(__dirname + '/components/rtm_manager.js')(controller);
//
// // Reconnect all pre-registered bots
// rtm_manager.reconnect();

// Enable Dashbot.io plugin
require(__dirname + '/components/plugin_dashbot.js')(controller);

var version = "Beta v1.0";
var atts = require(__dirname + '/plugins/attachments.js');
var rules = require(__dirname + '/plugins/rules.js');


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
}); 

var commandsPath = require("path").join(__dirname, "commands");
require("fs").readdirSync(commandsPath).forEach(function(file) {
  require("./commands/" + file)(controller, version, atts);
});

var fs = require('fs')
var restart = false;


if (process.env.studio_token) {
    //controller.on('direct_message,direct_mention,mention', function(bot, message) {
    //controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(function(convo) {
  controller.on('bot_channel_join',function(bot, message) {
    bot.say({
      text:"Well, howdy! I'm FTC Bot, here to help you with all \
of your FIRST Tech Challenge Needs. Type !help to learn all about what I can do!",
      
      channel:message.channel
    })
                
                })
      
} 



else {
    console.log('~~~~~~~~~~');
    console.log('NOTE: Botkit Studio functionality has not been enabled');
    console.log('To enable, pass in a studio_token parameter with a token from https://studio.botkit.ai/');
}
