module.exports = function(controller, version, atts) {
  controller.on('slash_command',function(slashCommand,message) {
  rules = rules;
    
  var path = require("path");
  var fs = require("fs");
    
  function getStatus() {
    return fs.readFileSync(__dirname + "/../status.txt",'utf8').toString();
    }
    
  var toolsPath = path.join(__dirname, '..', 'plugins', 'tools.js');
  var tools = require(toolsPath);
    
  var rulesPath = path.join(__dirname, '..', 'plugins', 'rules.js');
  var rules = require(rulesPath);
    
  var keysPath = path.join(__dirname, '..', 'plugins', 'keys.js');
  var keys = require(keysPath);
    
  var inter = require(__dirname + '/../plugins/interactive.js');
    
  var status = path.join(__dirname, 'maintanence.js')
    
  if (getStatus() === "online") {
    
    switch(message.command) {
    
      case "/echo":

        if (message.text === "" || message.text === "help") {
          slashCommand.replyPrivate(message,
            "I echo back what you tell me. " +
            "Try typing `/echo hello` to see.");
          return;
            }
        
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
        var uptime = tools.formatUptime(process.uptime())
        slashCommand.replyPublic(message, uptime);
      break;
      
    case "/rule":
      var rule = message.text.toUpperCase();
      
      if (rules.rulebook[rule] != undefined) {
        var final = '*' + tools.htmlEscape('<') + rule + tools.htmlEscape('>') + '* ' + rules.rulebook[rule];
        slashCommand.replyPublic(message, atts.ruleFormat(final, version));
        break;
      }
      
      else {
        slashCommand.replyPublic(message, "Oops. I couldn't find that rule.");
        break;
      }   
      
      
      
    case "/rulesearch":
      var result = tools.searchFor(message.text, rules);
      var resultList = result.split(" ");
        if (resultList.length <= 5) {
      slashCommand.replyPublic(message, inter.interactiveSearch(resultList, message.text));
          return;
        }
        
      else {
        slashCommand.replyPublic(message, atts.searchFormat(message.text, result, version));
        return;
                          }
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
          var query = tools.assembleQuery(userInput, '_');
          url = "https://www.tetrixrobotics.com/Search/" + query
          slashCommand.replyPublic(message, url);
        break;
          
        case 'modernrobotics':
        case 'mr':
          var query = tools.assembleQuery(userInput, '%20');
          url = "http://www.modernroboticsinc.com/search?as=true&cid=0&q=" + query + "&Sid=True&Isc=true";
          slashCommand.replyPublic(message, url);
        break;
          
        case 'rev':
        case 'revrobotics':
          var query = tools.assembleQuery(userInput, '+');
          url = "http://www.revrobotics.com/search.php?search_query=" + query;
          slashCommand.replyPublic(message, url);
        break;
          
        case 'andymark':
        case 'am':
          var query = tools.assembleQuery(userInput, '+');
          url = "http://www.andymark.com/Search-s/545.htm?Search=" + query + "&Submit=";
          slashCommand.replyPublic(message, url);
        break;
          
        case 'actobotics':
          var query = tools.assembleQuery(userInput, '+');
          url = "http://www.revrobotics.com/search.php?search_query=" + query;
          slashCommand.replyPublic(message, url);
        break;
          
        default:
          userInput.splice(0, 0, "nothingtoseehere");
          var query = tools.assembleQuery(userInput, '+');
          url = "https://www.google.com/search?q=" + query;
          slashCommand.replyPublic(message, url + "\n if you would like results from \
a specific vendor's site, please use the vendor before the query");
                   }
      break;
      
    case "/forums":
      var userInput = message.text.split(" ");
      userInput.splice(0, 0, "nothingtoseehere");
      
      var baseURL = "https://ftcforum.usfirst.org/search?q=";
      var query = tools.assembleQuery(userInput, '+');
      var url = baseURL + query;
      console.log(baseURL);
      var request = require('request');
        
      slashCommand.replyPublic(message, url);
    break;
      
    case "/resourcelibrary":
      var userInput = message.text.split(" ");
      userInput.splice(0, 0, "nothingtoseehere"); 
      var query = tools.assembleQuery(userInput, '+');
      var url = "https://www.firstinspires.org/resource-library?flagged=All&combine=" + query + "&field_resource_library_tags_tid=All&field_resource_library_tags_tid=All&sort_by=created_1";
      slashCommand.replyPublic(message, url + query);
      
    break;
      
    case "/robot":
      var gifAddr = tools.getRandomInt(0, 2);
      var gifURL = "what";
      var request = require('request');
	
	    request('http://api.giphy.com/v1/gifs/random?api_key=' + keys.giphyKey + '&tag=robot&limit=1', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred 
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  
      gifURL = JSON.parse(body).data.image_url;
      console.log(gifURL);
      slashCommand.replyPublic(message, atts.image(gifURL));
      });
    break; 

    }
  } 
  
});
};

