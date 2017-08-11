var ruleFormat = function(rule, version) {
  return {
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
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
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#FFA500",
          "title": "Rules Containing '" + query + "'...",
            "text": results,
          "footer" : "FTC Bot " + version,
          "mrkdwn_in" : ["text"],
          
        }
    ]
  };
}
  
exports.ruleFormat = ruleFormat;
exports.searchFormat = searchFormat;


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
