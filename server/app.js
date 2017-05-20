const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);//default namespace
const messageBoard = io.of("/messageBoard");//custom namespace
const redisConnection = require("./redis-connection");
const nrpSender = require("./routes/nrp-sender-shim");
const appdata = require("./data");
const mbData = appdata.messageBoard;

const configRoutes = require("./routes");
const passport = require("passport");
const session = require('express-session');
const Strategy = require("passport-local").Strategy;
const flash = require('connect-flash');
const bcrypt = require("bcrypt-nodejs");
const userData = appdata.user;
const jwt = require('jsonwebtoken');
const jwtSecret = "a secret phrase!!"


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    req.get('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(flash());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Before asking Passport to authenticate a request, the strategy used by an application must be configured.
// Strategies, and their configuration, are supplied via the use() function.
passport.use('login', new Strategy({
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // check in mongo if a user with username exists or not 
        email = decodeURIComponent(email)

        userData.getUserByEmailPassport(email,
            function (err, user) {

                // In case of any error, return using the done method
                if (err) {
                    console.log("ERROR in passport use.");
                    return done(err);
                }
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + email);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error
                if (!isPasswordValid(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                req.session.user = user;
                const data = {
                    token: jwt.sign(user._id, jwtSecret),
                    user: user._id
                }
                // User and password both match, return user from
                // done method which will be treated like success
                console.log(user);
                return done(null, true, data);
            }
        );
    }));

/*
 In order to support login sessions, Passport will serialize and deserialize
 user instances to and from the session.
 */
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    userData.getUserByIDPassport(id, function (err, user) {
        done(err, user);
    });
});

var isPasswordValid = function (user, password) {
    // return password === user.passwordHash;
    return bcrypt.compareSync(password, user.passwordHash);
}

app.get('/messages', (req, res) => {
    res.sendFile(__dirname + '/index.html');//sending static file
});

messageBoard.on('connection', (socket) => {//listening for a connection event
    console.log('a user connected');
    socket.on('join-room', (data) => {
        socket.leave(data.previousRoom);
        socket.join(data.newRoom);
        let messageFromRoomArray = [];
        //send new room id and db messages for that room
        mbData.getMessagesByRoom(data.newRoom)
            .then((messageFromRoomArray) => {
                let changes = {
                    newRoom: data.newRoom,
                    dbMessages: messageFromRoomArray
                };
                socket.emit("joined-room", changes);
                return messageFromRoomArray;
            }).catch((e) => {
                return e.message;
            });

    });

    socket.on('send-message', async (msg) => {//listening for 'send message' event
        //when event received, server publishes message via Redis to tell worker to add message to DB
        console.log("info socket received:");
        console.log(msg.userName);
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
            console.log("in db: " + JSON.stringify(response));
            //messageBoard.emit('receive-message', response);

            //send user's message to message board
            messageBoard.to(msg.room).emit('receive-message', msg.userName, msg.userMessage);

            socket.emit('request-credentials');
        }
        catch (e) {
            messageBoard.emit('receive-message', e.message);
        }

    });


});

configRoutes(app);
/*http.listen(3001, () => {  
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3001");
});*/
http.listen(3002, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3002");
});
