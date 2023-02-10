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
let topic = 'bgan';
// Divs to show messages:
let localDiv, remoteDiv;
// Whether the client should be publishing or not:
let publishing = true;

function setup(){
    // Put the divs in variables for ease of use:
    localDiv = document.getElementById('local');
    remoteDiv = document.getElementById('remote')
    
    // Set text of localDiv:
    localDiv.innterHTML = 'trying to connect';
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
    let result = 'Received a message on topic: ' + topic;
    // Message is a buffer, conver to a string:
    result += '<br>message payload: ' + payload.toString();
    // Packet is a JSON object, so list its elements:
    result += '<br>MQTT packet: <ul>';
    for(let item in packet){
        result += '<li>' + item + ': ' + packet[item] + '</li>';
    }

    // Close the ul tag
    result += '</ul>';
    // Update the remote div text:
    remoteDiv.innerHTML = result;
}

// On page load, call the setup function:
document.addEventListener('DOMContentLoaded', setup);
// Run a loop every 2 seconds:
setInterval(loop, 2000);
