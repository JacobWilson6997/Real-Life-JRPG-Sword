var accel = require('./accel.js')
var screen = require('./screen.js')

function actionMenu(button, currentData) {
  console.log(currentData)
  console.log("action menu button pressed")
  if(button == "top") {
    currentData.move = "attack"
  } else if (button == "middle") {
    currentData.move = "heal"
  }
  let playerA = ""
  let playerB = ""
  console.log("player list length:", currentData.playerList.length)
  if(currentData.playerList.length > 2) {
    if(currentData.playerList[0] == currentData.name) {
      playerA = currentData.playerList[1]
      playerB = currentData.playerList[2]
    } else if (currentData.playerList[1] == currentData.name) {
      playerA = currentData.playerList[0]
      playerB = currentData.playerList[2]
    } else if (currentData.playerList[2] == currentData.name) {
      playerA = currentData.playerList[0]
      playerB = currentData.playerList[1]
    }
  } else if(currentData.playerList.length > 1) {
    if(currentData.playerList[0] == currentData.name) {
      playerA = currentData.playerList[1]
    } else {
      playerA = currentData.playerList[0]
    }
  }
  screen.display("choose your target","Dragon%" + playerA + "%" + playerB, currentData.hp)
  return currentData
}

function targetMenu(button, currentData) {
  console.log("target menu button pressed")
  if(button == "top") {
    currentData.target == "Dragon"
  } else if (button == "middle" && currentdata.playerList.length > 1) {
    if(currentData.playerList[0] == currentData.name) {
      currentData.target = currentData.playerList[1]
    } else {
      currentData.target = currentData.playerList[0]
    }
  } else if (currentdata.playerList.length > 2){
    if(currentData.playerList[2] == currentData.name) {
      currentData.target = playerList[1]
    } else {
      currentData.target = playerList[2]
    }
  }
  currentData.state = "fight"
  console.log("writing to accel")
  screen.display( "","Swing%The%Sword",currentData.hp)
  accel.detectMotion(currentData)
}
function navigateMenu(button, currentData) {
  console.log("current state in navigateMenu:", currentData.state)
  if(currentData.state == "action"){
    currentData.state = "target"
    currentdata = actionMenu(button, currentData)
  } else if(currentData.state == "target") {
    targetMenu(button, currentData)
  }
  return currentData
}

module.exports = { navigateMenu }