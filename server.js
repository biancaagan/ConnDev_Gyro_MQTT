const express = require('express');
const app = express();

const portNum = 3000;


// Serve alL the static files in the public folder:
//server.use('/gyro/', express.static("public"));


function serverStart(){
    console.log("Server started on port " + portNum);
}

// Basic route
app.get('/gyro', (req, res) => {
        res.send("Hello there.");
    });

// Listen for requests:
app.listen(portNum, serverStart);


