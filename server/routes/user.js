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

var srcUserImage = "../userImages/test.jpeg";
//var desPath = "../testImageMagick/";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/getimage/information', function (req, res) {
    console.log("It's located in " + __dirname);
    im.identify(srcUserImage, function (err, features) {
        if (err) throw err;
        res.json({ "images_data": features });
    });
});

/**
	resize operations
	=================
	options that you can pass while resize image from one to another
	options : 
	{
		srcPath: undefined,
		srcData: null,
		srcFormat: null,
		dstPath: undefined,
		quality: 0.8,
		format: 'jpg',
		progressive: false,
		width: 0,
		height: 0,
		strip: true,
		filter: 'Lagrange',
		sharpening: 0.2,
		customArgs: []
	}
    const args = [
        "-",                     // use stdin
        "-gravity", "center",    // sets the offset to the center
        "-extent", "500x500",    // crop
        "-background", "white",  // set a white background for the centered image
        "+repage",               // reset the virtual canvas meta-data from the images.
        "png:-"                  // output to stdout as a png
    ];
**/

//creating thumbnail
router.get('/image/resize', function (req, res) {
    let imagePath = path.resolve(srcUserImage);
    var optionsObj = {
        srcPath: imagePath,
        dstPath: desPath + "test_changed.png",
        quality: 0.6,
        width: "50",
        height: "50",
        format: 'png',
        customArgs: [
            '-gravity', 'center',
            "-bordercolor", "blue",
            "-border", "10x10",
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
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "userImage",
            data: {
                image: srcUserImage
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});

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


// router.post('/login', passport.authenticate('login', {
//     successRedirect: '/myprofile',
//     failureRedirect: '/login',
//     failureFlash : true
// }));


router.post('/login', (req, res, next) => {
    // successRedirect: '/user',
    // failureRedirect: '/login',
    // failureFlash : true
console.log(req.body)

    return passport.authenticate('login', (err, token, userData) => {
   //     console.log("token");
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
                      user: userData

            });
        }
    })(req, res, next);
        console.log(res);


});

router.post("/signup", function (request, res) {
    var requestData = request.body;
    console.log(requestData)
    userData.addUser(request.body)
        .then((newUser) => {
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