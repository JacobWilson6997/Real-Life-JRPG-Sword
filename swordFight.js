const { lastestButtonPressed, preventButtonPress } = require("./swordButtons")

button = require("swordButtons.js")

async function displayResults(receivedData){
  if(receivedData.healedBy != '') {
    console.log(receivedData.message)
  }
  if(receivedData.move == 'db') {
    console.log('you were attacked by dragon breath')
  } else if (receivedData.move == 'dt') {
    console.log("the dragon strikes you with it's tail")
  } else if (receivedData.move == 'dc') {
    console.log("you where slashed by the dragon's claw")
  } else if (receivedData.move == 'dc 2') {
    console.log("you where slashed by the dragon's claw twice")
  }
  console.log('current hp =',receivedData.hp)
  
  
} 
async function menuNavigation(receivedData) {
  console.log("Enter your Move (1 for attack or 2 for item)")
  let skip
  let target = []
  preventButtonPress = false;// how to wait until after a button is pushed

  if(lastButtonPressed == 'top') { //attack
    skip = receivedData.name // don't display it's own name
    target.push('dragon')
  }
  console.log("Who is your target")
  for(let i = 0; i < receivedData.playerList.length; i++) {
    if(receivedData.playerList[i] != skip) {
      target.push(receivedData.playerList[i])
    }
    console.log(i +':',target[i])
  }
  rl.question('', function(targetNum) {
      receivedData.move = move
      receivedData.target = target[targetNum]
      return receivedData
  });
}

async function fight(receivedData) {
  
  displayResults(receivedData) 
  //add timeout must has await

  const result = await menuNavigation(receivedData)
  return result
}

module.exports = { fight };