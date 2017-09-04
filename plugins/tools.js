exports.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.formatUptime = function formatUptime(uptime) {
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

exports.htmlEscape = function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function htmlEscapeNative(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


exports.searchFor = function searchFor(term, rules) {
  var results = [];
  for (var key in rules.rulebook) {
    var currentRule = rules.rulebook[key].toLowerCase();
    
    
    var lt = htmlEscapeNative('<');
    var gt = htmlEscapeNative('>');
    
    if (currentRule.includes(term.toLowerCase())) {
      results.push(key);
    }
    
  }
  
  var answer = "";
  for (var i = 0; i < results.length; i++) {
    answer = answer.concat(/*(htmlEscapeNative('<')*/results[i] +  " "/*htmlEscapeNative('> ')*/);
  }
  
  if (answer != "") {
    return answer
  }
  
  else {
    return "Oops! Your search did not return any results."
  }
}

exports.assembleQuery = function assembleQuery(userInput, symbol) {
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

