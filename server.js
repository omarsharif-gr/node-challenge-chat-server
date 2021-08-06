var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require("http").Server(app)
var io=require("socket.io")(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', (req, res) =>{
    res.send(messages)
})

app.post('/messages', (req, res) =>{
  messages.push(req.body)
  io.emit("message", req.body)
  res.sendStatus(200)
})
io.on("connection", (socket) => {
  console.log("User connected")
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
























// const express = require("express");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const { check, validation } = require("express-validator");

// const app = express();
// app.use(cors());

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

// //This array is our "data store".
// //We will start with one message in the array.
// //Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage];

// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });

// app.get("/messages", function (req, res) {
//   res.render("messages");
// });

// app.post("/messages", function (request, response) {
//   res.json(req.body)
// })

// const listener = app.listen(process.env.PORT || 3000, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
