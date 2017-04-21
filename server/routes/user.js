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

const userData = data.user;

//var userImagePath = "../testImageMagick/test_userPageImage.png";
//var desPath = "../testImageMagick/";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//getOneUser
router.get("/:id", (req, res) => {
   userData.getUserById(req.params.id).then((Userdesc) => {
        res.status(200).json(Userdesc);
    }).catch((error) => {
        // Not found!
        res.sendStatus(404);
    });
});

//getAllUsers
router.get("/", (req, res) => {
    userData.getAllUsers().then((UserList) => {
        res.status(200).json(UserList);
    }).catch((error)=>{
        console.log(error);
        if(error === "404")
            res.sendStatus(404);
        else
            res.sendStatus(500);
    });
});

router.get('/getimage/information', function (req, res) {
    console.log("It's located in " + __dirname);
    im.identify(srcUserImage, function (err, features) {
        if (err) throw err;
        res.json({ "images_data": features });
    });
});


//creating thumbnail
router.get('/image/resize', function (req, res) {
    let imagePath = path.resolve(srcUserImage);
    var optionsObj = {
        srcPath: imagePath,
        dstPath: desPath + "test_changed.png",
        quality: 0.6,
        width: "25",
        height: "25",
        format: 'png',
        customArgs: [
            '-gravity', 'center'
        ]
    };
    im.resize(optionsObj, function (err, stdout) {
        if (err) throw err;
        res.json({
            "message": "Resized Image successfully"
        });
    });
});

//to test imageMagick using a worker
router.get("/image/resizeWorker", async (req, res) => {
    //let userImagePath = req.file.path;
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "convertUserImageToThumbnailAndPageImg",
            data: {
                image: userImagePath,
                userName: "jgrayson"
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});





router.delete("/:id", async (req, res) => {
    userData
});

router.put("/:id", async (req, res) => {
    let personData = req.body;
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "put",
            data: {
                id: req.params.id,
                message: personData
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});


router.post('/login', (req, res, next) => {

    return passport.authenticate('login', (err, token, user) => {
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'login succeed!',
                userUUID: user._id
            });
        }
    })(req, res, next);
});

router.post("/signup", function (request, res) {
    let userImagePath = req.file.path;
    var requestData = request.body;
    let userName = requestData.userid;
    userData.addUser(request.body)
        .then(async (newUser) => {
            //send user image to worker to become a thumbnail
            try {
                let response = await nrpSender.sendMessage({
                    redis: redisConnection,
                    eventName: "convertUserImageToThumbnailAndPageImg",
                    data: {
                        image: userImagePath,
                        userName: userName
                    }
                });
                return response;
            } catch (e) {
                res.json({ error: e.message });
            }
        }).then((response) => {
            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up! Now you should be able to log in.'
            });
        }).catch((e) => {
            console.log(e);
            return res.status(200).json({
                success: false,
                message: e
            });
        });
});

module.exports = router;