const redisConnection = require("./redis-connection");
const fetch = require('node-fetch');
fetch.Promise = require('bluebird');
const fs = require('fs');
const im = require('imagemagick');
const path = require("path");

const desPath = "../testImageMagick/";

console.log("Worker started. Ready to retreive messages");

redisConnection.on('userImage:request:*', (message, channel) => {
    //must have event name and request id
    let eventName = message.eventName;
    let requestId = message.requestId;

    let uploadedImage = message.data.image;
    
    let successEvent = `${eventName}:success:${requestId}`;

      let  result = module.exports.convertUserImageToPageImage(uploadedImage);

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            message: result,
        },
        eventName: eventName
    });

    
});

redisConnection.on('resizeBook:request:*', (message, channel) => {
    //must have event name and request id
    let eventName = message.eventName;
    let requestId = message.requestId;

    let bookUploadedImage = message.data.image;
    
    let successEvent = `${eventName}:success:${requestId}`; 

    let result = module.exports.convertBookImageToPageImage(bookUploadedImage);

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            message: result,
        },
        eventName: eventName
    });

    
});


module.exports = {
convertUserImageToThumbnail(userImage){
     var optionsObj = {
		srcPath: userImage,
		dstPath: desPath+"test_userthumbnail.png",
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
		if (err) return "Could not convert user image file";
		return "image successfully converted and stored at " + desPath;
	});
            
},

convertUserImageToPageImage(userImage){
     var optionsObj = {
		srcPath: userImage,
		dstPath: desPath+"test_userPageImage.png",
		quality: 0.6,
		width: "250",
        height: "250",
        format: 'png',
        customArgs: [
            '-gravity', 'center',
            "-bordercolor","black", 
            "-border","5x5", 
        ]
        
	};
	im.resize(optionsObj, function(err, stdout){
		if (err) return "Could not convert user image file";
		return "image successfully converted and stored at " + desPath;
	});
            
},
convertBookImageToPageImage(bookImage){
     var optionsObj = {
		srcPath: bookImage,
		dstPath: desPath+"test_bookPageImage.png",
		quality: 0.6,
		width: "350",
        height: "350",
        format: 'png',
        customArgs: [
            '-gravity', 'center',
            "-bordercolor","green", 
            "-border","5x5", 
        ]
        
	};
	im.resize(optionsObj, function(err, stdout){
		if (err) return "Could not convert user image file";
		return "image successfully converted and stored at " + desPath;
	});
            
}


}