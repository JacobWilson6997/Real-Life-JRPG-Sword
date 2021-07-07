var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var topButton = new Gpio(17, 'in', 'rising', {debounceTimeout: 100}); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var middleButton = new Gpio(27, 'in', 'rising', {debounceTimeout: 100});
var bottomButton = new Gpio(22, 'in', 'rising', {debounceTimeout: 100});
const sockets = require('./swordSocket.js')
const menus = require('./menus.js')

topButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log("current state in top:", sockets.currentData.state)
  sockets.currentData = menus.navigateMenu("top",sockets.currentData)
});
middleButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log("current state in middle:", sockets.currentData.state)
  if(sockets.currentData.state == "connected") {
    console.log("current state in middleIf:", sockets.currentData.state)
    sockets.currentData.state = 'ready' // the sword is ready to start
    console.log("sending ready to dragon")
    sockets.connection.send(JSON.stringify(sockets.currentData)) // send ready data
  } else {
    sockets.currentData = menus.navigateMenu("middle",sockets.currentData)
  }
});

bottomButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log("current state in bottom:", sockets.currentData.state)
  if(sockets.currentData.state = "target") {
    sockets.currentData = menus.navigateMenu("bottom",sockets.currentData)
  }
});

function unexportOnClose() { //function to run when exiting program
  topButton.unexport(); // Unexport Button GPIO to free resources
  middleButton.unexport();
  bottomButton.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c


console.log("running")
