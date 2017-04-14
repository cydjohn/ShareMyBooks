const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const messageBoard = mongoCollections.messageBoard;
const userData = data.users;
const uuid = require('node-uuid');
const time = require('time');

let exportedMethods = {
    addMessage(message) {
        return messageBoard().then((messageBoardCollection) => {
            let newMessage = {
                _id: uuid.v4(),
                fromUserId: message.fromUserId,
                toUserId: message.toUserId,
                messageText: message.messageText,
                messageTag: message.messageTag,
                time: new time.Date()
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
            return messageBoardCollection.findOne({ _id, id }).then((message) => {
                if (!message) {
                    throw "message not found";
                }
                return message
            });
        });
    },
    getMessageBoardByFromUserId(id) {
        return messageBoard().then((messageBoardCollection) => {
            return messageBoardCollection.findOne({ fromUserId, id }).then((message) => {
                if (!message) {
                    throw "message not found";
                }
                return message.toArray();
            });
        });
    },
    getMessageBoardByToUserId(id) {
        return messageBoard().then((messageBoardCollection) => {
            return messageBoardCollection.findOne({ toUserId, id }).then((message) => {
                if (!message) {
                    throw "message not found";
                }
                return message.toArray();
            });
        });
    },
    deleteMessageById(id) {
        return messageBoard().then((messageBoardCollection) => {
            return messageBoardCollection.removeOne({_id:id}).then((deleteInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    console.log(`Could not delete product with id of ${id}`);
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

