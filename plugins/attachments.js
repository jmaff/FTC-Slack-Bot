//Contains all "attached" message objects to avoid clutter in bot.js exported as functions to vary information

var ruleFormat = function(rule, version) {
  return {
    "attachments": [
        {
            "fallback": "Rule result",
            "color": "#FFA500",
            "text": rule,
          "footer" : "FTC Bot " + version,
          "mrkdwn_in" : ["text"],
          
        }
    ]
  };
}


var searchFormat = function(query, results, version) {
  return {
    "attachments": [
        {
            "fallback": "Search result for " + query,
            "color": "#FFA500",
          "title": "Rules Containing '" + query + "'...",
            "text": results,
          "footer" : "FTC Bot " + version,
          "mrkdwn_in" : ["text"],
          
        }
    ]
  };
}


var help = function(version) {
  return {
    "attachments": [
        {
            "fallback": "List of commands for FTC Bot",
            "color": "#FFA500",
            "title": "FTC Bot " + version + " Command List",
            "title_link": "https://github.com/jmaff/FTC-Slack-Bot",
            "fields": [
              {
                    "title": "-------------- Bot Information Commands (!) --------------",
                    "short": false
                },
              
              {
                    "title": "!about",
                    "value": "Returns information about FTC Bot",
                    "short": false
                },
              
              {
                    "title": "!help",
                    "value": "Sends the user this message",
                    "short": false
                },
              
              {
                    "title": "!feedback",
                    "value": "Provides a link to a feedback form for FTC Bot",
                    "short": false
                },
              //--------------------Divider-----------------------------
              {
                    "title": "--------------------- Bot Commands (/) --------------------",
                    "short": false
                },
              
              
              {
                    "title": "/coinflip",
                    "value": "Flips a coin",
                    "short": false
                },
              
              {
                    "title": "/echo",
                    "value": "Repeat what you say once",
                    "short": false
                },
              
              {
                    "title": "/forums",
                    "value": "Searches the FTC forums for a query",
                    "short": false
                },
              
              {
                    "title": "/ftcroot",
                    "value": "Returns a ftcroot link for the given team number",
                    "short": false
                },
              
              {
                    "title": "/parts",
                    "value": "Returns a search result for a specific part. Specify a vendor \
before the query to search on that vendor's site instead of google",
                    "short": false
                },
              
                {
                    "title": "/ping",
                    "value": "Returns pong!",
                    "short": false
                },
              
              {
                    "title": "/resourcelibrary",
                    "value": "Searches the FIRST Resource Library for a query",
                    "short": false
                },
              
              {
                    "title": "/robot",
                    "value": "Returns a random robot GIF",
                    "short": false
                },
              
              {
                    "title": "/rule",
                    "value": "Returns the information about a given rule",
                    "short": false
                },
              
              {
                    "title": "/rulesearch",
                    "value": "Searches all rules from the current game manuals and returns the ones containing the given search query",
                    "short": false
                },
              
              
              {
                    "title": "/uptime",
                    "value": "Returns how long the bot has been running",
                    "short": false
                }
              
            
      
            ],
            
            "footer": "FTC Bot " + version,
            
        }
    ]
  };
}



var feedback = function(version) {
  return [
        {
            "fallback": "Provide feedback about FTC Bot!",
            "color": "#FFA500",
          "title": "Comments, Questions, Suggestions? We'd love to hear from you!",
            "text": "Visit this link to submit a feedback form. We really appreciate you taking \
time to help make FTC Bot better.",
          "fields" : [
          {
          "value": "https:\/\/goo.gl/forms/VMIZ8p9s57VRNCyr1"
        }
          ],
          
          "footer" : "FTC Bot " + version,
          "mrkdwn_in" : ["text"],
          
        }
    ];
}

var vendors = function(version) {
  return {
    "attachments": [
        {
            "fallback": "List of part vendors supported by the /parts command",
            "color": "#FFA500",
            "title": "Supported Part Vendors (case insensitive)",
            "fields": [

              {
                    "title": "TETRIX",
                    "value": "tetrix",
                    "short": false
                },
              
              
              {
                    "title": "REV Robotics",
                    "value": "rev, revrobotics",
                    "short": false
                },
              
              {
                    "title": "AndyMark",
                    "value": "andymark, am",
                    "short": false
                },
              
              {
                    "title": "Modern Robotics",
                    "value": "modernrobotics, mr",
                    "short": false
                },
              
              
            
      
            ],
            
            "footer": "FTC Bot " + version,
            
        }
    ]
  };
}

var image = function(gifURL){
  return {
    "attachments": [
        {
            "fallback": "Random Robot GIF",
            "color": "#FFA500",
            
            "image_url": gifURL
        }
    ]

  };
}

var about = function(version) {
  return [
        {
            "fallback": "About FTC Bot",
            "color": "#FFA500",
          "title": "About FTC Bot " + version,
            "text": "Presented to you by FTC Team 8711: The Gas Attendants, FTC Bot is an open-sourced project aimed to be a tool for FIRST Tech Challenge teams use in the Slack communication service. This is NOT an official application from FIRST or FIRST Tech Challenge itself, just a tool we wanted to share with other teams. We really hope you enjoy using FTC Bot, and be sure to let us know your thoughts using !feedback. Thanks everyone!",
          "footer" : "FTC Bot " + version,
          "mrkdwn_in" : ["text"],
          "thumb_url": "https://cdn.glitch.com/049d271f-9462-4d10-a9a0-4f09d7574033%2Flargelogo.jpg?1503861353357",
          "fields": [

              {
                    "title": "GitHub Repository",
                    "value": "https://github.com/jmaff/FTC-Slack-Bot",
                    "short": false
                },
            
            {
                    "title": "Team 8711 Website",
                    "value": "http://thegasattendantsftc.weebly.com/",
                    "short": false
                },
            ]
        }
    ];
}

  

  
exports.ruleFormat = ruleFormat;
exports.searchFormat = searchFormat;
exports.help = help;
exports.feedback = feedback;
exports.vendors = vendors;
exports.image = image;
exports.about = about;
exports.basicAttatch = {
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
}