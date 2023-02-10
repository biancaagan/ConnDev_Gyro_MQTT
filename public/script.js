// test.mosquitto.org uses no username and password:
const broker = 'wss://test.mosquitto.org:8081';

// MQTT client:
let client;

// Connection options:
let options = {
    // Clean session
    clean: true,
    // Connect timeout in ms:
    connectTimeout: 10000,
    // Authentication
    clientId: 'mqttJsClient',
}

// Topic to subscribe to when you connect:
let topic = 'bgan/#';
// Divs to show messages:
let localDiv, remoteDiv, headingVar;
// Whether the client should be publishing or not:
let publishing = true;

function setup(){
    // Put the divs in variables for ease of use:
    localDiv = document.getElementById('local');
    remoteDiv = document.getElementById('remote');
    headingVar = document.getElementById('hVal');
    
    // Set text of localDiv:
    localDiv.innerHTML = 'trying to connect';
    // Attempt to connect:
    client = mqtt.connect(broker, options);
    // Set listeners:
    client.on('connect', onConnect);
    client.on('close', onDisconnect);
    client.on('message', onMessage);
    client.on('error', onError);
}

// Handler for MQTT connect event:
function onConnect(){
    // Update localDiv text:
    localDiv.innerHTML = 'Connected to broker. Subscribing...'
    client.subscribe(topic, onSubscribe);
}

// Handler for MQTT disconnect event:
function onDisconnect(){
    // Update localDiv text:
    localDiv.innterHTML = 'Disconnected from broker.'
}

// Handler for MQTT error event:
function onError(error){
    // Update localDiv text:
    localDiv.innterHTML = error;
}

// Handler for MQTT subscribe event:
function onSubscribe(response, error){
    if(!error){
        // Update localDiv text:
        localDiv.innerHTML = 'Subscribed to broker.';
    } else{
        // Update localDiv text with the error:
        localDiv.innerHTML = error;
    }
}

// Handler for MQTT message received event:
function onMessage(topic, payload, packet){
    let result = 'Incoming messages on the topic: ' + topic;

    // Message is a buffer, convert to a string:
    let payloadStr = payload.toString();

    // Convert to JSON:
    let payloadJson = JSON.parse(payloadStr);

    result += '<br>';

    // List out individual gyro values:
    let headingVal = payloadJson.heading;
    let pitchVal = payloadJson.pitch;
    let rollVal = payloadJson.roll;
    result += '<br>Heading Value: ' + headingVal;
    result += '<br>Pitch Value: ' + pitchVal;
    result += '<br>Roll Value: ' + rollVal;

    // Canvas
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(Math.abs(rollVal), Math.abs(pitchVal));
    ctx.lineTo(headingVal, Math.abs(rollVal));
    ctx.stroke();
   

    // // Packet is a JSON object, so list its elements:
    // result += '<br>MQTT packet: <ul>';
    // for(let item in packet){
    //     result += '<li>' + item + ': ' + packet[item] + '</li>';
    // }

    // // Close the ul tag
    // result += '</ul>';

    // Update the remote div text:
    remoteDiv.innerHTML = result;
}

 



// On page load, call the setup function:
document.addEventListener('DOMContentLoaded', setup);
// Run a loop every 2 seconds:
setInterval(loop, 2000);



// // Handler for MQTT message received event:
// function onMessage(topic, payload, packet){
//     let result = 'Received a message on topic: ' + topic;

//     // Message is a buffer, convert to a string:
//     let payloadStr = payload.toString();
//     result += '<br>Message payload: ' + payloadStr;

//     // Convert to JSON:
//     let payloadJson = JSON.parse(payloadStr);

//     // List out ALL gyro values:
//     result += '<br>Gyro Values: <ul>';
//     for(let val in payloadJson){
//         result += '<li>' + val + ': ' + payloadJson[val] + '</li>';
//     }
//     result += '</ul>';

//     // List out individual gyro values:
//     let headingVal = payloadJson.heading;
//     let pitchVal = payloadJson.pitch;
//     let rollVal = payloadJson.roll;
//     result += '<br>Heading Value: ' + headingVal;
//     result += '<br>Pitch Value: ' + pitchVal;
//     result += '<br>Roll Value: ' + rollVal;

//     // Canvas
//     var c = document.getElementById("myCanvas");
//     var ctx = c.getContext("2d");
//     ctx.beginPath();
//     ctx.moveTo(Math.abs(rollVal), Math.abs(pitchVal));
//     ctx.lineTo(headingVal, Math.abs(rollVal));
//     ctx.stroke();
   

//     // Packet is a JSON object, so list its elements:
//     result += '<br>MQTT packet: <ul>';
//     for(let item in packet){
//         result += '<li>' + item + ': ' + packet[item] + '</li>';
//     }

//     // Close the ul tag
//     result += '</ul>';
//     // Update the remote div text:
//     remoteDiv.innerHTML = result;
// }