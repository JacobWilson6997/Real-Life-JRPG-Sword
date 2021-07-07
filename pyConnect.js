
var spawn = require('child_process').spawn,
    py    = spawn('python', ['accel.py']),
    output = '';

py.stdout.on('data', function(data){
  output= data.toString();
});
py.stdout.on('end', function(){
  console.log(output);
  connection.send(JSON.stringify(currentData))
});
//console.log(JSON.stringify(data))
//py.stdin.write("");
py.stdin.end();