
//console.log(JSON.stringify(output))
// let ob = {
//   lines: "All%We%Want%To%Do%Is%Eat%Your%Brains",
//   yStart: 10,
//   xStart: 10,
//   fontSize: 24,
//   lineSpacing: 12,
//   percentHP: 50
// }
// screen.stdin.write(JSON.stringify(ob));
//screen.stdin.end();

function sendToScreen(ob) {
  var spawn = require('child_process').spawn,
    screen    = spawn('python', ['screen.py']),
    output = '';
  screen.stdout.on('data', function(data){
    output += data.toString();
  });
  screen.stdout.on('end', function(){
    console.log(output);
    //connection.send(JSON.stringify(currentData))
  });
  screen.stdin.write(JSON.stringify(ob))
  screen.stdin.end();
}

function display(messageSmall, messageBig,hp) {
  let ob = {
    smallText: {
    lines: messageSmall + '%',
    yStart: 5,
    xStart: 0,
    fontSize: 12,
    lineSpacing: 0
    },
    bigText: {
      lines: messageBig + '%',
      yStart: 12,
      xStart: 10,
      fontSize: 19,
      lineSpacing: 14
    },
    percentHP: hp
  }
  sendToScreen(ob)
}

// async function displayResults(receivedData){
//   if(receivedData.healedBy != '') {
//     console.log(receivedData.message)
//   }
//   if(receivedData.move == 'db') {
//     console.log('you were attacked by dragon breath')
//   } else if (receivedData.move == 'dt') {
//     console.log("the dragon strikes you with it's tail")
//   } else if (receivedData.move == 'dc') {
//     console.log("you where slashed by the dragon's claw")
//   } else if (receivedData.move == 'dc 2') {
//     console.log("you where slashed by the dragon's claw twice")
//   }
//   console.log('current hp =',receivedData.hp)
  
  
// } 
//display( "Choose your target", "Dragon%Player 2% Player 3", 75)
 module.exports = { display}