const express = require("express");
const server = express();
const bodyParser = require("body-parser");

const portNum = 8111;

// JSON data to serve as a response, and to modify
// when you get a POST request:
var myData = {
    sensor: 20
};

// Serve alL the static files in the public folder:
server.use('/gyro/', express.static("public"));
// Use the body parser middleware:
server.use(bodyParser.json());


function serverStart(){
    console.log("Server started on port " + portNum);
}

// Listen for requests:
server.listen(portNum, serverStart);


