const express = require('express');
const router = express.Router();
const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();
const redisConnection = require("../redis-connection");
const nrpSender = require("./nrp-sender-shim");
const fs = require('fs');
const im = require('imagemagick');
const path = require("path");
const data = require("../data");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const jwtSecret = "a secret phrase!!"
const multer = require('multer');
const upload = multer({ dest: "./uploads" });
const xss = require("xss");


const userData = data.user;

var srcUserImage = "../testImageMagick/user5.jpeg";
//var desPath = "../testImageMagick/";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//get all users
router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.status(200).json(userList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

//get 1 user by _id
router.get("/:id", (req, res) => {
    let id = xss(req.params.id);
    userData.getUserById(id).then((userResult) => {
        res.status(200).json(userResult);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

//get 1 user by userid
router.get("/user/:userid", (req, res) => {
    let userid = xss(req.params.userid);
    userData.getUserByUserId(userid).then((userResult) => {
        res.status(200).json(userResult);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});


router.put("/:id",(req, res) => {
    let id = xss(req.params.id);
    
    let address = xss(req.body.address);
    let email = xss(req.body.email);
    let firstName = xss(req.body.firstName);
    let lastName = xss(req.body.lastName);
    let phoneNumber = xss(req.body.phoneNumber);
    
    let updatedUser = {
        address: address,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
    }
    userData.updateUser(id,updatedUser).then((user) =>{
        if(!user) {
            res.status(200).json({
                success: false,
                message: "Error while updating a user info!"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: user
            });
        }
    });
});



// router.post('/login', passport.authenticate('login', {
//     successRedirect: '/myprofile',
//     failureRedirect: '/login',
//     failureFlash : true
// }));
router.post('/authenticate', (req, res, next) => {
    var token = req.body.token;
    return jwt.verify(token, jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
            res.status(401).json({ message: 'Could not process the form.' })
        }

        res.status(200).json({ message: "valid Token" })


        // check if a user exists

    });
})


router.post('/login', (req, res, next) => {
    // successRedirect: '/user',
    // failureRedirect: '/login',
    // failureFlash : true
    console.log(req.body)

    return passport.authenticate('login', (err, success, data) => {
        
        if (!success) {
            return res.status(400).json({
                success: false,
                message: 'Could not process the form'
            });
        }
        else {
            console.log(data.token, "++++++++++", data.user)
            return res.status(200).json({
                success: true,
                message: 'login succeed!',
                token: data.token,
                user: data.user
            });
        }
    })(req, res, next);
});

router.post("/signup",upload.single('photo'),function (request, res) {
    let userImagePath = request.file.path;
    var userInfo = request.body;
    console.log(userInfo)
    console.log(request.file)
    let firstName = xss(request.body.firstName);
    let lastName = xss(request.body.lastName);
    let userID = xss(request.body.userID);
    let password = xss(request.body.password);

    let address = xss(request.body.address);
    let email = xss(request.body.email);
    let phoneNumber = xss(request.body.phoneNumber);

    let newUserObj = {
       firstName: firstName,
        lastName: lastName,
        userID: userID,
        password: password,
        address: address,
        email: email,
        phoneNumber: phoneNumber
    }
    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create an account" });
        return;
    }

    if (!firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    if (!userID) {
        res.status(400).json({ error: "You must provide a userid" });
        return;
    }

    if (!password) {
        res.status(400).json({ error: "You must provide a password" });
        return;
    }
    

    if (!address) {
        res.status(400).json({ error: "You must provide a address" });
        return;
    }

    if (!email) {
        res.status(400).json({ error: "You must provide an email" });
        return;
    }
    if (!phoneNumber) {
        res.status(400).json({ error: "You must provide a phone number" });
        return;
    }
    
    //console.log(request)
    userData.addUser(newUserObj)
        .then(async(newUser) => {
             if (!newUser) {
            return res.status(200).json({
                success: false,
                message: "Error while adding a user!"
            });
        }
        else {
            //send user image to worker to become a thumbnail
            let response;
            try {
                response = await nrpSender.sendMessage({
                    redis: redisConnection,
                    eventName: "convertUserImage",
                    data: {
                        image: userImagePath,
                        userName: newUser.userID
                    }
                });

            } catch (e) {
                res.json({ error: e.message });
            }
            
        
            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up! Now you should be able to log in.'
            });
            }
        }).catch((e) => {
            console.log(e);
            return res.status(200).json({
                success: false,
                message: e
            });
        });
});


//to test imageMagick using a worker with a new location of the image folder
router.get("/image/resizeWorker", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "convertUserImage",
                    data: {
                        image: srcUserImage,
                        userName: "janderson"
                    }
        });

        res.json({response});
    } catch (e) {
        res.json({ error: e.message });
    }
});


module.exports = router;