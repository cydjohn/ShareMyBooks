const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const privateMessage = mongoCollections.privateMessage;
const uuid = require('node-uuid');
var moment = require('moment');


let exportedMethods = {
    getPrivateMessageById(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.findOne({_id:id}).then((privateMessage) => {
                if(!privateMessage) {
                    throw "Private messages not found";
                }
                return privateMessage;
            });
        });
    },
    addPrivateMessage(message) {
        return privateMessage().then((privateMessageCollection) => {
            let newMessage = {
                _id: uuid.v4(),
                fromUserId: message.fromUserId,
                toUserId: message.toUserId,
                messageText: message.messageText,
                messageRead: false,
                time: moment().format()
            };
            return privateMessageCollection.insertOne(newMessage).then((newMessageInfo) => {
                return newMessageInfo.insertedId;
            }).then((newId) => {
                return this.getPrivateMessageById(newId);
            })
        }).catch((e) => {
            console.log("Error while adding message:", e)
        });
    },
    getAllPrivateMessageByFromUserId(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.find({fromUserId:id}).toArray().then((messageInfo)=>{
                if(messageInfo.length == 0){ 
                        return Promise.reject("There are no messsages from user " + id);
                    }
                    else{
                        return messageInfo;
                    }
            });  

        });
    },
    getAllPrivateMessageByToUserId(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.find({toUserId:id}).toArray().then((messageInfo)=>{
                if(messageInfo.length == 0){ 
                        return Promise.reject("There are no messsages for user " + id);
                    }
                    else{
                        return messageInfo;
                    }
            });  

        });
    },
    getNewPrivateMessageByFromUserId(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.find({$and:[ {fromUserId:id}, {messageRead:false} ]}).toArray().then((messageInfo)=>{
                if(messageInfo.length == 0){ 
                        return Promise.reject("There are no new messsages from user " + id);
                    }
                    else{
                        return messageInfo;
                    }
                    });  

        });
    },
    getNewPrivateMessageByToUserId(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.find({$and:[ {toUserId:id}, {messageRead:false} ]}).toArray().then((messageInfo)=>{
                if(messageInfo.length == 0){ 
                        return Promise.reject("There are no new messsages to user " + id);
                    }
                    else{
                        return messageInfo;
                    }
            });
        });
    },
    deletePrivateMessageById(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.removeOne({_id:id}).then((deleteInfo) => {
                if (deleteInfo.deletedCount === 0) {
                    return `Could not delete private message with id of ${id}`;
                }
                else {
                    return "success";
                }
            }).catch((err) => {
                return "Error while removing private message:" + err;
            });
        });
    },
    updateMessageReadStatus(id, updateMessage) {
        if (!id || !updateMessage || id == undefined || updateMessage == undefined) {
            return Promise.reject("Please valid input for your message.\n");
        }

        return privateMessage().then((privateMessageCollection) => {
            let updatedMessageData = {};

            if (updateMessage.fromUserId) {
                updatedMessageData.fromUserId = updateMessage.fromUserId;
            }

            if (updateMessage.toUserId) {
                updatedMessageData.toUserId = updateMessage.toUserId;
            }

            if (updateMessage.time) {
                updatedMessageData.time = updateMessage.time;
            }

            if (updateMessage.messageRead === false) {
                updatedMessageData.messageRead = true;
            }

            let updateCommand = {
                $set: updatedMessageData
            };
            return privateMessageCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getPrivateMessageById(id);
            }).catch((err) => {
                console.log("Error while updating book:", err);
            });

        });
    }
}

module.exports = exportedMethods;