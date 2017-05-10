const redisConnection = require("./redis-connection");
const fetch = require('node-fetch');
fetch.Promise = require('bluebird');
const fs = require('fs');
const im = require('imagemagick');
const path = require("path");
const data = require("./data");
const mbData = data.messageBoard;
const pmData = data.privateMessage;

const desPath = "../userThumbnailImages/";

console.log("Worker started. Ready to retreive messages");

redisConnection.on('addMessageToMessageBoardCollections:request:*', (message, channel) => {
    //must have event name and request id
    let eventName = message.eventName;
    let requestId = message.requestId;
    let successEvent = `${eventName}:success:${requestId}`;
    let userName = message.data.userName;
    let userMessage = message.data.userMessage;
    let room = message.data.room;

    //let result = module.exports.addMessageToMessageBoardCollections(userName, userMessage, room);
     let newMessage = {
            userName: userName,
            userMessage: userMessage,
            room: room
        };
        mbData.addMessage(newMessage)
            .then((result) => {
                redisConnection.emit(successEvent, {
                    requestId: requestId,
                    data: {
                        message: result,
                    },
                    eventName: eventName
                });
            }).catch((e) => {
                return e.message;
            });

});

redisConnection.on('addPrivateMessageToDB:request:*', (message, channel) => {
    //must have event name and request id
    let eventName = message.eventName;
    let requestId = message.requestId;
    let successEvent = `${eventName}:success:${requestId}`;
    let fromUserId = message.data.message.fromUserId;
    let toUserId = message.data.message.toUserId;
    let messageText = message.data.message.messageText;


     let newMessage = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        messageText: messageText
    }

        pmData.addPrivateMessage(newMessage)
            .then((result) => {
                //return result;
                redisConnection.emit(successEvent, {
                    requestId: requestId,
                    data: {
                        message: result,
                    },
                    eventName: eventName
                });
            }).catch((e) => {
                return e.message;
            });

});


redisConnection.on('convertUserImage:request:*', (message, channel) => {
    //must have event name and request id
    let eventName = message.eventName;
    let requestId = message.requestId;

    let uploadedImage = message.data.image;
    let userName = message.data.userName;

    let successEvent = `${eventName}:success:${requestId}`;

    //let result = module.exports.convertUserImageToThumbnail(uploadedImage,userName);


    let result2 = module.exports.convertUserImageToPageImage(uploadedImage,userName);
    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            //message1: result,
            message2: result2
        },
        eventName: eventName
    });


});

redisConnection.on('convertBookImageToThumbnailAndPageImg:request:*', (message, channel) => {
    //must have event name and request id
    console.log("inside method");
    let eventName = message.eventName;
    let requestId = message.requestId;

    let uploadedImage = message.data.image;
    let bookid = message.data.bookid;

    let successEvent = `${eventName}:success:${requestId}`;

    let result = module.exports.convertBookImageToPageImage(uploadedImage,bookid);
    
    /*let thumbnailResult;
    //convert to book image thumbnail
    let thumbnailDesPath = "../FrontEnd/public/bookThumbnailImages/";
        let thumbnailOptionsObj = {
            srcPath: bookImage + ".jpg",
            dstPath: thumbnailDesPath + bookid + ".png",
            quality: 1.0,
            width: "50",
            height: "50",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]

        }
        console.log("here");
        im.resize(thumbnailOptionsObj, function (err, stdout) {
            if (err) return "Could not convert user image file";
            thumbnailResult= "image successfully converted and stored at " + desPath;
            console.log(thumbnailResult);
        });

        //convert to book image page
        let pageResult;
    let pageDesPath = "../FrontEnd/public/bookPageImages/";
        var pageOptionsObj = {
            srcPath: bookImage + ".jpg",
            dstPath: pageDesPath + bookid + ".png",
            quality: 1.0,
            width: "350",
            height: "350",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]

        };
        im.resize(pageOptionsObj, function (err, stdout) {
            if (err) return "Could not convert user image file";
            pageResult= "image successfully converted and stored at " + desPath;
            console.log(pageResult);
        });
      */  
    let result2 = module.exports.convertBookImageToThumbnail(uploadedImage,bookid);
    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            message1: result,
            message2: result2
        },
        eventName: eventName
    });



});


module.exports = {
    addMessageToMessageBoardCollections(userName, userMessage, room) {
        let message = {
            userName: userName,
            userMessage: userMessage,
            room: room
        };
        mbData.addMessage(message)
            .then((result) => {
                return result;
            }).catch((e) => {
                return e.message;
            });
    },
    convertUserImageToThumbnail(userImage,userName) {
        const desPath = "../FrontEnd/public/userThumbnailImages/";
        var optionsObj = {
            srcPath: userImage,
            dstPath: desPath + userName + ".png",
            quality: 1.0,
            width: "25",
            height: "25",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "white",
                "-border", "2x2",
            ]

        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) return "Could not convert user image file";
            return "image successfully converted and stored at " + desPath;
        });

    },


    convertUserImageToPageImage(userImage,userName) {
        const desPath = "../FrontEnd/public/userPageImages/";
        var optionsObj = {
            srcPath: userImage,
            dstPath: desPath + userName + ".png",
            quality: 1.0,
            width: "250",
            height: "250",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]

        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) return "Could not convert user image file";
            console.log("user's image successfully converted and stored at " + desPath + userName + ".png");
            return "image successfully converted and stored at " + desPath;
        });

    },
    convertBookImageToThumbnail(bookImage,bookid) {
        const desPath = "../FrontEnd/public/bookThumbnailImages/";
        var optionsObj = {
            srcPath: bookImage,
            dstPath: desPath + bookid + ".png",
            quality: 100.0,
            width: "275",
            height: "183",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]

        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) return "Could not convert user image file";
            console.log("image successfully converted and stored at " + desPath);
            return "image successfully converted and stored at " + desPath;
        });

    },
    convertBookImageToPageImage(bookImage,bookid) {
        const desPath = "../FrontEnd/public/bookPageImages/";
        var optionsObj = {
            srcPath: bookImage,
            dstPath: desPath + bookid + ".png",
            quality: 1.0,
            width: "350",
            height: "450",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]

        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) return "Could not convert user image file";
            console.log("image successfully converted and stored at " + desPath);
            return "image successfully converted and stored at " + desPath;
        });

    }


}