const express = require('express');
const app = express();

const portNum = 3000;


// Serve alL the static files in the public folder:
//app.use('/gyro/', express.static("public"));    // with server
app.use(express.static("public"));    // locally


function serverStart(){
    console.log("Server started on port " + portNum);
}

// // Basic route
// app.get('/gyro', (req, res) => {
//         res.send("Hello there.");
//     });

// Listen for requests:
app.listen(portNum, serverStart);


