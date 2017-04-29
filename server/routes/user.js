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

const userData = data.user;

var srcUserImage = "../testImageMagick/1.jpeg";
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
    let id = req.params.id;
    userData.getUserById(id).then((userResult) => {
        res.status(200).json(userResult);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

//get 1 user by userid
router.get("/user/:userid", (req, res) => {
    let userid = req.params.userid;
    userData.getUserByUserId(userid).then((userResult) => {
        res.status(200).json(userResult);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});


/*

//to upload user's profile data using a worker
router.post("/", async (req, res) => {
    let userData = req.body;
    //to access an uploaded file: req.file.path
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post",
            data: {
                message: personData
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});



router.post("/", async (req, res) => {
    let personData = req.body;
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post",
            data: {
                message: personData
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "delete",
            data: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});


router.put("/:id",(req, res) => {
    userData.updateUser(req.params.id,req.body).then((user) =>{
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
*/

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
        console.log(data.token, "++++++++++", data.user)
        if (!success) {
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'login succeed!',
                token: data.token,
                user: data.user
            });
        }
    })(req, res, next);
});

router.post("/signup", function (request, res) {
    //let userImagePath = request.file.path;
    var userInfo = request.body;
    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create an account" });
        return;
    }

    if (!userInfo.firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!userInfo.lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    if (!userInfo.userID) {
        res.status(400).json({ error: "You must provide a userid" });
        return;
    }

    if (!userInfo.password) {
        res.status(400).json({ error: "You must provide a password" });
        return;
    }
    

    if (!userInfo.address) {
        res.status(400).json({ error: "You must provide a address" });
        return;
    }

    if (!userInfo.email) {
        res.status(400).json({ error: "You must provide an email" });
        return;
    }
    if (!userInfo.phoneNumber) {
        res.status(400).json({ error: "You must provide a phone number" });
        return;
    }
    
    console.log(requestData)
    userData.addUser(request.body)
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
                    eventName: "convertUserImageToThumbnailAndPageImg",
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
            eventName: "convertUserImageToThumbnailAndPageImg",
                    data: {
                        image: srcUserImage,
                        userName: "testCheck2"
                    }
        });

        res.json({response});
    } catch (e) {
        res.json({ error: e.message });
    }
});


module.exports = router;