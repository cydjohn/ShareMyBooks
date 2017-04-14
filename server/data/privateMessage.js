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
            })
        })
    }
}

module.exports = exportedMethods;