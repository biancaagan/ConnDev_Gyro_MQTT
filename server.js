var express = require('express');       // include express.js
const res = require('express/lib/response');
var server = express();         // a local instance of it


function serverStart() {
    console.log("Server started");
}


// Start the server
server.listen(8111, serverStart);


// Routes
// basic route
server.get('/gyro', (req, res) => {
    res.send("Hello there.\n");
});








