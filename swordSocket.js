const WebSocket = require('ws')
const url = 'ws://192.168.4.1:8080'
const connection = new WebSocket(url)
const screen = require('./screen.js')

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


//"host": "192.168.4.16" player 1
//"host": "192.168.4.2" player 2
//"host": "192.168.4.8", player 3
let currentData = {
  name: 'player 2', // player name
  hp: 100,
  heal: 1,
  move: 'attack',// or item
  target: 'dragon',// where the move is going
  state:"connecting",// what phase of the game we are at
  playerList: [],
  message: '' 
}
module.exports.currentData = currentData

connection.onopen = async () => { //Send initial data to the server and esstablish the connection.
  let dataStr = JSON.stringify(currentData)
  connection.send(dataStr) 
}

connection.onerror = (error) => {//If server isn't running print the error.
  console.log('Could not connect')
  screen.display("Could not find%dragon please turn%dragon on and%restart the sword","",0)
  process.exit(1)
  //connection.send(JSON.stringify(currentData))
  //console.log(error)
}
function stateMachine(currentData) {
  if(currentData.hp <= 0) {
    screen.display("","Game%Over",0)
    connection.send(JSON.stringify(currentData))
    process.exit(1)
  } else if( currentData.state == "finished") {
    screen.display("","You%Win",currentData.hp)
    process.exit(1)
  } else if(currentData.state == "connected") { // initial connection conformation
    console.log("current state in connection:",currentData.state)
    screen.display( "Press Middle%Button When%all Players%are Ready","",currentData.hp)
  } else if(currentData.state == "fight") {
    console.log("current state in connection:",currentData.state)
    currentData.state = "action"
    screen.display("Choose Your Action","Attack%Heal", currentData.hp)
  }
  module.exports.currentData = currentData
}


connection.onmessage = async (jStr) => {//Get the server's reply
  //console.log("received:", jStr.data)
  let currentData = JSON.parse(jStr.data)
  if(currentData.message == "") {
    stateMachine(currentData)
  } else {
    screen.display(currentData.message,"",currentData.hp)
    currentData.message = ""
    setTimeout(stateMachine,5000,currentData)
  }
}

module.exports = {connection}