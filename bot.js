var env = require('node-env-file');
env(__dirname + '/.env');


if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  console.log('Error: Specify clientId clientSecret and PORT in environment');
  usage_tip();
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


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});

var rules = require(__dirname + '/plugins/rules.js');
var atts = require(__dirname + '/plugins/attachments.js');
var inter = require(__dirname + '/plugins/interactive.js');
var warnings = {};
var gifs = require(__dirname + '/plugins/gifdir.js');
var version = "Alpha v0.3.1";

var fs = require('fs')
var restart = false;


function changeStatus(newValue) {
  var filename = __dirname + "/status.txt";

  fs.writeFileSync(filename, newValue, 'utf8');

}

function getStatus() {
  return fs.readFileSync(__dirname + "/status.txt",'utf8').toString();
}

function restart() {
  process.exit(1);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
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
    //controller.on('direct_message,direct_mention,mention', function(bot, message) {
        //controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(function(convo) {
  controller.on('bot_channel_join',function(bot, message) {
    bot.say({
      text:"Well, howdy! I'm FTC Bot, here to help you with all \
of your FIRST Tech Challenge Needs. Type !help to learn all about what I can do!",
      
      channel:message.channel
    })
                
                })
  
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
  
  controller.hears(['!feedback'], 'ambient', function(bot,message) {
    
    bot.say({
    "attachments" : atts.feedback(version),
      "channel":message.channel
  
    });

});
  
  
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
    
  
  controller.on('slash_command',function(slashCommand,message) {
    

  switch(message.command) {
    case "/echo":

            if (message.text === "" || message.text === "help") {
                slashCommand.replyPrivate(message,
                    "I echo back what you tell me. " +
                    "Try typing `/echo hello` to see.");
                return;
            }

            // If we made it here, just echo what the user typed back at them
            //TODO You do it!
            slashCommand.replyPublic(message, message.text);

            break;
      
    case "/ping":
      slashCommand.replyPublic(message, "Pong!");
      
      break;
      
    case "/ftcroot":
      if (!isNaN(message.text)) {
          slashCommand.replyPublic(message, 'http://www.ftcroot.com/teams/' + message.text);
        return;
          }
      
      else {
        slashCommand.replyPublic(message, message.text + " is not a valid team number.");
        return;
      }
      
      break;
      
    case "/uptime":
      var uptime = formatUptime(process.uptime())
      slashCommand.replyPublic(message, uptime);
      break;
      
    case "/rule":
      var rule = message.text.toUpperCase();
      
      if (rules.rulebook[rule] != undefined) {
        var final = '*' + htmlEscape('<') + rule + htmlEscape('>') + '* ' + rules.rulebook[rule];
        slashCommand.replyPublic(message, atts.ruleFormat(final, version));
        break;
      }
      
      else {
        slashCommand.replyPublic(message, "Oops. I couldn't find that rule.");
        break;
      }   
      
      
      
    case "/rulesearch":
      var result = searchFor(message.text);
      slashCommand.replyPublic(message, atts.searchFormat(message.text, result, version));
      break;
      
    case "/coinflip":
      var result = Math.random();
      if (result < 0.5) {
        slashCommand.replyPublic(message, "Heads!");
      }
      
      else {
        slashCommand.replyPublic(message, "Tails!");
      }
    
      break;
      
    case "/parts":
      var userInput = message.text.split(" ");
      var vendor = userInput[0].toLowerCase();
      var query = "";
      var url = ""
      
      
      
      switch(vendor) {
        case 'help':
          slashCommand.replyPublic(message, "Use /parts [vendor] [part name] to find \
a specific robotics part. For a list of vendors type /parts vendors");
          break;
        
        case 'vendors':
          slashCommand.replyPublic(message, atts.vendors(version));
          break;
          
        case 'tetrix':
          var query = assembleQuery(userInput, '_');
          url = "https://www.tetrixrobotics.com/Search/" + query
          slashCommand.replyPublic(message, url);
          break;
          
        case 'modernrobotics':
        case 'mr':
          var query = assembleQuery(userInput, '%20');
          url = "http://www.modernroboticsinc.com/search?as=true&cid=0&q=" + query + "&Sid=True&Isc=true";
          slashCommand.replyPublic(message, url);
          break;
          
        case 'rev':
        case 'revrobotics':
          var query = assembleQuery(userInput, '+');
          url = "http://www.revrobotics.com/search.php?search_query=" + query;
          slashCommand.replyPublic(message, url);
          break;
          
        case 'andymark':
        case 'am':
          var query = assembleQuery(userInput, '+');
          url = "http://www.andymark.com/Search-s/545.htm?Search=" + query + "&Submit=";
          slashCommand.replyPublic(message, url);
          break;
          
        case 'actobotics':
          var query = assembleQuery(userInput, '+');
          url = "http://www.revrobotics.com/search.php?search_query=" + query;
          slashCommand.replyPublic(message, url);
          break;
          
        default:
          userInput.splice(0, 0, "nothingtoseehere");
          var query = assembleQuery(userInput, '+');
          url = "https://www.google.com/search?q=" + query;
          slashCommand.replyPublic(message, url + "\n if you would like results from \
a specific vendor's site, please use the vendor before the query");
          
                   }
      break;
      
    case "/forums":
      var userInput = message.text.split(" ");
      
      if (userInput.length === 1) {
        userInput.splice(0, 0, "nothingtoseehere");
      }
      
      var url = "https://ftcforum.usfirst.org/search?q=";
      var query = assembleQuery(userInput, '+');
      slashCommand.replyPublic(message, url + query);
      
      break;
      
      case "/resourcelibrary":
      var userInput = message.text.split(" ");
      
      if (userInput.length === 1) {
        userInput.splice(0, 0, "nothingtoseehere");
      }
      var query = assembleQuery(userInput, '+');
      var url = "https://www.firstinspires.org/resource-library?flagged=All&combine=" + query + "&field_resource_library_tags_tid=All&field_resource_library_tags_tid=All&sort_by=created_1";
      slashCommand.replyPublic(message, url + query);
      
      break;
      
    case "/robot":
      var gifAddr = getRandomInt(0, 2);
      var gifURL = "what";
      var request = require('request');
	
	request('http://api.giphy.com/v1/gifs/random?api_key=35dd7233b0fc40da80610be2cbdaf41a&tag=robot&limit=1', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  
  gifURL = JSON.parse(body).data.image_url;
  console.log(gifURL);
  slashCommand.replyPublic(message, atts.image(gifURL));
});
      break;



      
      
        default:
            slashCommand.replyPublic(message, "I'm afraid I don't know how to " + message.command + " yet.");
    
    
  }
  
  
});    
  } 
  
  
  
//}).catch(function(err) {
            //bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err);
            //debug('Botkit Studio: ', err);
      
} 



else {
    console.log('~~~~~~~~~~');
    console.log('NOTE: Botkit Studio functionality has not been enabled');
    console.log('To enable, pass in a studio_token parameter with a token from https://studio.botkit.ai/');
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('Botkit Starter Kit');
    console.log('Execute your bot application like this:');
    console.log('clientId=<MY SLACK CLIENT ID> clientSecret=<MY CLIENT SECRET> PORT=3000 studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('Get Slack app credentials here: https://api.slack.com/apps')
    console.log('Get a Botkit Studio token here: https://studio.botkit.ai/')
    console.log('~~~~~~~~~~');
}

function formatUptime(uptime) {
  var unit = 'second';
  if (uptime > 60) {
    uptime = uptime / 60;
    unit = 'minute';
  }
  
  if (uptime > 60) {
    uptime = uptime / 60;
    unit = 'hour';
  }
  
  if (uptime != 1) {
    unit = unit + 's';
  }
  
  uptime = uptime + ' ' + unit;
  return uptime;
}

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function searchFor(term) {
  var results = [];
  for (var key in rules.rulebook) {
    var currentRule = rules.rulebook[key].toLowerCase();
    
    
    var lt = htmlEscape('<');
    var gt = htmlEscape('>');
    
    if (currentRule.includes(term.toLowerCase())) {
      results.push(key);
    }
    
  }
  
  var answer = "";
  for (var i = 0; i < results.length; i++) {
    answer = answer.concat(htmlEscape('<') + results[i] + htmlEscape('>'));
  }
  
  if (answer != "") {
    return answer
  }
  
  else {
    return "Oops! Your search did not return any results."
  }
}

function assembleQuery(userInput, symbol) {
  var query = "";
  for(var i = 1; i < userInput.length; i++) {
        if (i != userInput.length - 1) {
          query = query + userInput[i] + symbol;
        }
    
        else {
          query = query + userInput[i];
        }
      }
  
  return query;
}