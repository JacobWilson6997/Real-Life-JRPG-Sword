//"host": "192.168.4.8", top facing pins
const WebSocket = require('ws')
const fight = require("./swordFight.js")
const buttons = require('./swordButtons.js')
const url = 'ws://192.168.4.1:8080'
const connection = new WebSocket(url)


    // sword makes initial connection
      //with power on onopen sends a JSON object with a state of 'connecting'
    // dragon saves all connects.
      //dragon saves the name varible in the JSON as a Key in a Map, the data in the map is the socket
    // sword sends ready command
      //swords send a JSON with state 'ready' when button in pressed
    // dragon starts fight when all saved connections are ready
      // save every ready connection in a vector and discard duplicates,
    // the fight starts with the dragon sending the starting command
      // when the vector size equals the number of players, send JSON with state Start
    // sword selects an attack and JSON is formed and sent.
    // sword wait until dragon replys
    // Dragon waits for all JSON objects
// if there is a heal, a heal is sent. make sure there is a few second gap
// dragon chooses an attack and sends it.
// even if a player isn't damaged they will still reseave some data so that they know to continue
// once data is reseived the next round starts



let currentData = {
  name: 'player 1', // player name
  hp: 100,
  heal: 1,
  move: 'attack',// or item
  target: 'dragon',// where the move is going
  state:"connecting",// what phase of the game we are at
  playerList: [],
  message: '' 
}
let state = "begining"



connection.onopen = async () => { //Send initial data to the server and esstablish the connection.
  let dataStr = JSON.stringify(currentData)
  connection.send(dataStr) 
}

connection.onerror = (error) => {//If server isn't running print the error.
  console.log('WebSocket error:')
  console.log(error)
}

connection.onmessage = async (jStr) => {//Get the server's reply
  console.log("received:", jStr.data)
  currentData = JSON.parse(jStr.data)
  if(receivedData.state == "connected") { // initial connection conformation
    displayMessage("Press Middle Button When all Players are Ready")
    state = "connected"
  } else if(currentData.state == "fight") {



    currentData = fight.fight(currentData)
    connection.send(JSON.stringify(currentData))
  }
}


console.log("running")