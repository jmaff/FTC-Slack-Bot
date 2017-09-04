exports.interactiveSearch = function (results, query) {
  var buttons = [];
  for (var i = 0; i < results.length; i++) {
    buttons.push({});
  }
  
  console.log(buttons);
  console.log(results);
  
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i]["name"] = results[i];
    buttons[i]["text"] = results[i];
    buttons[i]["value"] = results[i];
    buttons[i]["type"] = "button";
  }
  
  buttons.splice(buttons.length, 1);
  console.log(buttons);
  return {
        attachments:[
            {
                title: 'Search results for ' + query + '...',
                color: '#FFA500',
                callback_id: '123',
                attachment_type: 'default',
                actions: buttons
            }
        ]
  }
    };


