const express = require('express');
const router = express.Router();
const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();
const redisConnection = require("../redis-connection");
const nrpSender = require("./nrp-sender-shim");
const path = require("path");
const data = require("../data");
const pmData = data.privateMessage;
const userData = data.user;
const xss = require("xss");


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


//get messages from this user
router.get("/from/:userid", (req, res) => {//works
    let userid = xss(req.params.userid);
pmData.getAllPrivateMessageByFromUserId(userid).then((messageResult) => {
        res.status(200).json(messageResult);
    }).catch((e) => {
        res.status(404).json({e});
    });

    
});

//get messages to this user
router.get("/to/:id", (req, res) => {//works
    let id = xss(req.params.id);
    pmData.getAllPrivateMessageByToUserId(id).then((messageResult) => {
        res.status(200).json(messageResult);
    }).catch((e) => {
        res.status(404).json({e});
    });
});

//get new messages from this user
router.get("/from/new/:id", (req, res) => {//works
    let id = xss(req.params.id);
    pmData.getNewPrivateMessageByFromUserId(id).then((messageResult) => {
        res.status(200).json(messageResult);
    }).catch((e) => {
        res.status(404).json({e});
    });
});

//get new messages to this user
router.get("/to/new/:id", (req, res) => {//works
    let id = xss(req.params.id);
    pmData.getNewPrivateMessageByToUserId(id).then((messageResult) => {
        res.status(200).json(messageResult);
    }).catch((e) => {
        res.status(404).json({e});
    });
});

//get messages by its message id
router.get("/:id", (req, res) => {//works
    let id = xss(req.params.id);
    pmData.getPrivateMessageById(id).then((messageResult) => {
        res.status(200).json(messageResult);
    }).catch((e) => {
        res.status(404).json({error: "No messages with id: " + id});
    });
});

//add message to db
router.post("/", async(req, res) => {//works
    let messageInfo = req.body;
    let fromUserId = xss(req.body.fromUserId);
    let toUserId = xss(req.body.toUserId);
    let messageText = xss(req.body.messageText);
    if (!messageInfo) {
        res.status(400).json({ error: "You must provide data to create a message" });
        //400 means bad request
        return;
    }

    if (!fromUserId) {
        res.status(400).json({ error: "You must provide who the message is from" });
        return;
    }

    if (!toUserId) {
        res.status(400).json({ error: "You must provide who the message is to" });
        return;
    }
    if (!messageText) {
        res.status(400).json({ error: "You must provide a message body" });
        return;
    }
    let newMessage = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        messageText: messageText
    }

        try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "addPrivateMessageToDB",
            data: {
                message: newMessage
            }
        });

        res.status(201).json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.put("/:id", (req, res) => {//works
    let id = xss(req.params.id);
    let getMessage = pmData.getPrivateMessageById(id);
    
    getMessage.then((messageToUpdate) => {

    return pmData.updateMessageReadStatus(id, messageToUpdate)
            .then((updatedMessage) => {
                res.status(200).json(updatedMessage);
            }).catch((e) => {
                res.status(500).json({ error: e });//500 for internal server error
            });
    }).catch(() => {
        res.status(404).json({ error: "Message not found" });//404 means not found
    });

});

router.delete("/:id", (req, res) => {//works
    let id = xss(req.params.id);

    pmData.deletePrivateMessageById(id)
            .then((deleteStatus) => {
                res.status(200).json(deleteStatus);
            }).catch((e) => {
                res.status(500).json({ error: e });//500 for internal server error
            });

});





module.exports = router;