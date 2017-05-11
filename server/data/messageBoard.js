const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const messageBoard = mongoCollections.messageBoard;
const userData = data.users;
const uuid = require('node-uuid');
var moment = require('moment');


let exportedMethods = {
    addMessage(message) {
        return messageBoard().then((messageBoardCollection) => {
            let newMessage = {
                _id: uuid.v4(),
                messageText: message.userMessage,
                postingUser: message.userName,
                room: message.room,
                timestamp: moment().format()
            }
            return messageBoardCollection.insertOne(newMessage).then((newMessageInfo) => {
                return newMessageInfo.insertedId;
            }).then((newId) => {
                return this.getMessageBoardById(newId);
            })
        }).catch((e) => {
            console.log("Error while adding message:", e)
        });
    },
    getMessageBoardById(id) {
        return messageBoard().then((messageBoardCollection) => {
            return messageBoardCollection.findOne({ _id: id }).then((message) => {
                if (!message) {
                    throw "message not found";
                }
                return message;
            });
        });
    },
    getMessagesByRoom(room) {
        return messageBoard().then((messageBoardCollection) => {
            return messageBoardCollection.find({room:room}).sort({timestamp: 1}).toArray();
            });
    },
    deleteMessageById(id) {
        return messageBoard().then((messageBoardCollection) => {
            return messageBoardCollection.removeOne({_id:id}).then((deleteInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    console.log(`Could not delete messageBoard with id of ${id}`);
                }
                else {
                    return "success";
                }
            }).catch((err) => {
                console.log("Error while removing messageBoard:", err);
            });
        });
    },
    

}

module.exports = exportedMethods;

