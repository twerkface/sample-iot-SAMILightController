var webSocketUrl = "wss://api.samsungsami.io/v1.1/websocket?ack=true";
var device_id = "fde8715961f84798a841be23480b8ce5";
var device_token = "06192752a09041f8b7c2878fa460fedc";

var WebSocket = require('ws');
var isWebSocketReady = false;
var ws = null;

var gpio = require('rpi-gpio');
var myPin = 11;// physical pin #
var myLEDState = 0;

/**
 * Gets the current time in millis
 */
function getTimeMillis(){
    return parseInt(Date.now().toString());
}

/**
 * Create a /websocket connection and setup GPIO pin
 */
function start() {
    //Create the WebSocket connection
    isWebSocketReady = false;
    ws = new WebSocket(webSocketUrl);
    ws.on('open', function() {
        console.log("WebSocket connection is open ....");
        register();
    });
    ws.on('message', function(data) {
 //      console.log("Received message: " + data + '\n');
         handleRcvMsg(data);
    });
    ws.on('close', function() {
         console.log("WebSocket connection is closed ....");
    });

    gpio.setup(myPin, gpio.DIR_OUT, function(err) {
        if (err) throw err;
        myLEDState = false; // default to false after setting up
        console.log('Setting pin ' + myPin + ' to out succeeded! \n');
     });
}

/**
 * Sends a register message to /websocket endpoint
 */
function register(){
    console.log("Registering device on the WebSocket connection");
    try{
        var registerMessage = '{"type":"register", "sdid":"'+device_id+'", "Authorization":"bearer '+device_token+'", "cid":"'+getTimeMillis()+'"}';
        console.log('Sending register message ' + registerMessage + '\n');
        ws.send(registerMessage, {mask: true});
        isWebSocketReady = true;
    }
    catch (e) {
        console.error('Failed to register messages. Error in registering message: ' + e.toString());
    }    
}


/**
 * Handle Actions
   Example of the received message with Action type:

   {
   "type":"action","cts":1451436813630,"ts":1451436813631,
   "mid":"37e1d61b61b74a3ba962726cb3ef62f1",
   "sdid":"fde8715961f84798a841be23480b8ce5",
   "ddid":"fde8715961f84798a841be23480b8ce5",
   "data":{"actions":[{"name":"setOn","parameters":{}}]},
   "ddtid":"dtf3cdb9880d2e418f915fb9252e267051","uid":"650a7c8b6ca44730b077ce849af64e90","mv":1
   }

 */
function handleRcvMsg(msg){
    var msgObj = JSON.parse(msg);
    if (msgObj.type != "action") return; //Early return;

    var actions = msgObj.data.actions;
    var actionName = actions[0].name; //assume that there is only one action in actions
    console.log("The received action is " + actionName);
    var newState;
    if (actionName.toLowerCase() == "seton") {
        newState = 1;
    }
    else if (actionName.toLowerCase() == "setoff") {
        newState = 0;
    } else {
        console.log('Do nothing since receiving unrecoganized action ' + actionName);
        return;
    }
    toggleLED(newState);
}

function toggleLED(value) {
    gpio.write(myPin, value, function(err) {
        if (err) throw err;
        myLEDState = value;
        console.log('toggleLED: wrote ' + value + ' to pin #' + myPin);
        sendStateToSami();
    });

}

/**
 * Send one message to SAMI
 */
function sendStateToSami(){
    try{
        ts = ', "ts": '+getTimeMillis();
        var data = {
              "state": myLEDState
            };
        var payload = '{"sdid":"'+device_id+'"'+ts+', "data": '+JSON.stringify(data)+', "cid":"'+getTimeMillis()+'"}';
        console.log('Sending payload ' + payload + '\n');
        ws.send(payload, {mask: true});
    } catch (e) {
        console.error('Error in sending a message: ' + e.toString() +'\n');
    }    
}

/**
 * All start here
 */


start();



