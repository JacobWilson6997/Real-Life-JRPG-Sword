function detectMotion(currentData) {
  const sockets = require('./swordSocket.js')
  const screen = require('./screen.js')
  var spawn = require('child_process').spawn,
      accel    = spawn('python', ['accel.py']),
      output = '';

    accel.stdout.on('data', function(data){
    output= data.toString();
  });
  accel.stdout.on('end', function(){
    console.log("detected Swing")
    sockets.connection.send(JSON.stringify(currentData))
    screen.display( "please wait for%your next turn","",currentData.hp)
  });
  //console.log(JSON.stringify(data))
  accel.stdin.write("");
  accel.stdin.end();
}
detectMotion
module.exports = { detectMotion }