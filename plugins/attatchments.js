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
                    "title": "/ftcroot",
                    "value": "Returns a ftcroot link for the given team number",
                    "short": false
                },
              
                {
                    "title": "/ping",
                    "value": "Returns pong!",
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

  
exports.ruleFormat = ruleFormat;
exports.searchFormat = searchFormat;
exports.help = help;
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
