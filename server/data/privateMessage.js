const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const privateMessage = mongoCollections.privateMessage;
const userData = data.users;
const uuid = require('node-uuid');

let exportedMethods = {
    getPrivateMessageById(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.findOne({_id:id}).then((privateMessage) => {
                if(!privateMessage) {
                    throw "Private message not found";
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
                messageTag: message.messageTag,
                // time: new time.Date()
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
    getPrivateMessageByFromUserId(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.findOne({fromUserId:id}).then((privateMessage) => {
                if(!privateMessage) {
                    throw "Private message not found";
                }
                return privateMessage.toArray();
            });
        });
    },
    getPrivateMessageByToUserId(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.findOne({toUserId:id}).then((privateMessage) => {
                if(!privateMessage) {
                    throw "Private message not found";
                }
                return privateMessage.toArray();
            });
        });
    },
    deletePrivateMessageById(id) {
        return privateMessage().then((privateMessageCollection) => {
            return privateMessageCollection.removeOne({_id:id}).then((deleteInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    console.log(`Could not delete private message with id of ${id}`);
                }
                else {
                    return "success";
                }
            }).catch((err) => {
                console.log("Error while removing private message:", err);
            });
        });
    },
}

module.exports = exportedMethods;