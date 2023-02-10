const express = require("express");
const server = express();
const bodyParser = require("body-parser");

const portNum = 8111;


// Serve alL the static files in the public folder:
server.use('/gyro/', express.static("public"));
// Use the body parser middleware:
server.use(bodyParser.json());

function serverStart(){
    console.log("Server started on port " + portNum);
}

// Basic route
server.get('/gyro', (req, res) => {
        res.send("Hello there.");
    });

// Listen for requests:
server.listen(portNum, serverStart);


