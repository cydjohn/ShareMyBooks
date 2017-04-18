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
const bookData = data.book;

var srcBookImage = "../bookImages/1.jpg";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//get all books
router.get("/", (req, res) => {
        bookData.getAllBooks().then((bookList) => {
            res.status(200).json(bookList);
        }, () => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });
    });

//get 1 book
router.get("/:bookid", (req, res) => {
    let bookid = req.params.bookid;
        bookData.getBookById(bookid).then((bookResult) => {
            res.status(200).json(bookResult);
        }, () => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });
    });

//creating thumbnail
router.get('/image/resize', function(req, res) {
    let imagePath = path.resolve(srcUserImage);
	var optionsObj = {
		srcPath: imagePath,
		dstPath: desPath+"test_changed.png",
		quality: 0.6,
		width: "50",
        height: "50",
        format: 'png',
        customArgs: [
            '-gravity', 'center',
            "-bordercolor","blue", 
            "-border","10x10", 
        ]
        
	};
	im.resize(optionsObj, function(err, stdout){
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
            eventName: "resizeBook",
            data: {
                image: srcBookImage
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});

//to upload book data using a worker
router.post("/", async(req, res) => {
    let bookInfo = req.body;
    //to access an uploaded file: req.file.path
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post",
            data: {
                book: bookInfo
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get",
            data: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.post("/", async(req, res) => {
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


module.exports = router;