const express = require('express');
const router = express.Router();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);//default namespace
const messageBoard = io.of("/messageBoard");//custom namespace
const redisConnection = require("../redis-connection");
const nrpSender = require("./nrp-sender-shim");
const data = require("../data");
const mbData = data.messageBoard;
/*
router.get('/getimage/information', function(req, res) {
    res.redirect("messageBoard/board");
});

app.get('/board', (req, res) => {
        res.sendFile(__dirname + '/index.html');//sending static file
    });
*/
messageBoard.on('connection', (socket) => {//listening for a connection event
  console.log('a user connected');
  socket.on('join-room', (data) => {
    socket.leave(data.previousRoom);
    socket.join(data.newRoom);
    let messageFromRoomArray = [];
    //send new room id and db messages for that room
    mbData.getMessagesByRoom(data.newRoom)
        .then((messageFromRoomArray) => {
            return messageFromRoomArray;
        }).catch((e) => {
            return e.message;
        });
    socket.emit("joined-room", data.newRoom, messageFromRoomArray);
  });

  socket.on('send-message', async (msg) => {//listening for 'send message' event
    //when event received, server publishes message via Redis to tell worker to add message to DB
    console.log("info socket received:");
    console.log(msg.username);
    console.log(msg.userMessage);
    try {
      
        //publish message to worker to upload to DB
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "addMessageToMessageBoardCollections",
            data: {
                userName: msg.userName,
				        userMessage: msg.userMessage,
                room: msg.room
            }
        });
        //will let me know if in DB
        console.log("in db: " + response);
        //messageBoard.emit('receive-message', response);

        //send user's message to message board
        messageBoard.to(msg.room).emit('receive-message', msg.username, msg.userMessage);

        socket.emit('request-credentials');
      } 
      catch (e) {
        messageBoard.emit('receive-message', e.message);
    }

  });


});
