module.exports = function() {
while (process.uptime < 300) {
  
}
  
setTimeout(function() {
    process.exit(1);
  }, 4000);
  
  console.log("Bot restarted after 5 minutes of inactivity");
  
};