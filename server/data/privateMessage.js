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
                time: new time.Date()
            };
            return privateMessageCollection.insertOne(newMessage).then((newMessageInfo) => {
                return newMessageInfo.insertedId;
            }).then((newId) => {
                return this.getPrivateMessageById(newId);
            })
        }).catch((e) => {
            console.log("Error while adding message:", e)
        });
    }
}

module.exports = exportedMethods;