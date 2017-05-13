const mongoCollections = require("../config/mongoCollections");
const userRequests = mongoCollections.userRequests;
const uuid = require('node-uuid');
var moment = require('moment');
const books = mongoCollections.books;
const users = mongoCollections.users;
const flat = require("flat");
const redis = require('redis');
const client = redis.createClient();


let exportedMethods = {
    addUserRequest(request) {
        return userRequests().then((userRequestsCollection) => {
            let newRequest = {
                _id: uuid.v4(),
                requestFrom: request.requestFrom,
                requestTo: request.requestTo,
                status: -1,
                //message: request.message,
                bookId: request.bookId

            };
            // cache
            client.hmsetAsync(newRequest._id, flat(newRequest));

            return userRequestsCollection.insertOne(newRequest).then((result) => {
                return result.insertedId;
                // return result;
            }).then((newId) => {
                return this.getRequestById(newId);
            });

        });
    },

    //debug only
    getAllRequests() {
        return userRequests().then((userRequestsCollection) => {
            return userRequestsCollection.find({}).toArray();
        });
    },
    async getRequestById(id) {
        let peopleResult = await client.existsAsync(id);
        if (peopleResult) {
            return client.hgetallAsync(id);
        }
        else {
            return userRequests().then((userRequestsCollection) => {
                return userRequestsCollection.findOne({ _id: id }).then(async (userRequest) => {
                    if (!userRequest) throw "user request not found";
                    let p = await client.hmsetAsync(id, flat(userRequest));
                    return userRequest;
                });
            });
        }
    },
    deleteRequestById(id) {
        return userRequests().then(async (userRequestsCollection) => {
            let p = await client.delAsync(id);
            return userRequestsCollection.deleteOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete request with id of ${id}`
                }
                else {
                    return id;
                }
            }).catch((e) => {
                console.log("Error while removing request:", e);
            });
        });
    },
    viewRequestByFromUserId(id) {
        return userRequests().then((userRequestsCollection) => {
            return userRequestsCollection.find({ requestFrom: id }).toArray();
        });
    },
    viewRequestByToUserId(id) {
        return userRequests().then((userRequestsCollection) => {
            return userRequestsCollection.find({ requestTo: id }).toArray();
        });
    },
    acceptUserRequest(id) {
        //let userRequestId = id;
        return userRequests().then((userRequestsCollection) => {
            return userRequestsCollection.findOne({ _id: id }).then((userRequest) => {
                if (!userRequest) throw "request not found";
                let updateData = {
                    status: 1
                }
                let updateCommand = {
                    $set: updateData
                }
                return userRequestsCollection.updateOne({ _id: id }, updateCommand).then(async () => {
                    let p = await client.delAsync(id);
                    return this.getRequestById(id);
                }).then((thisRequest)=>{
                        return books().then((booksCollection)=> {
                            return booksCollection.findOne({ _id: thisRequest.bookId}).then((book)=>{
                            return book;
                        });
                        });
                }).then((book)=>{
                        this.updateUserPoints(book._id,book.uploadedBy,book.bookPointsValue).then((user)=>{
                            //return this.getBookById(book._id);
                            //return this.getRequestById(id);
                        });
                        //return this.getBookById(book._id);
                        return this.getRequestById(id);
                });
            })
        });
    },
     updateUserPoints(bookid,userid,points){
        //return userData.updateUserTotalPoints(userid,points).then((user)=>{
          //  return user;
        //})
        return users().then((usersCollection) => {
            return usersCollection.findOne({ userID: userid }).then((requestedUser) => {
                if (!requestedUser) throw "user not foound";
                let updateData = {
                    userTotalPoints: requestedUser.userTotalPoints - points
                }
                let updateCommand = {
                    $set: updateData
                }
                return usersCollection.updateOne({ userID: userid }, updateCommand).then((updatedUser) => {
                    //return this.getBookById(bookid);
                    return updatedUser;
                });
            })
        });
    
    },
    rejectUserRequest(id) {
        return userRequests().then((userRequestsCollection) => {
            return userRequestsCollection.findOne({ _id: id }).then((userRequest) => {
                if (!userRequest) throw "request not found";
                let updateData = {
                    status: 0
                }
                let updateCommand = {
                    $set: updateData
                }
                return userRequestsCollection.updateOne({ _id: id }, updateCommand).then(async () => {
                    let p = await client.delAsync(id);
                    return this.getRequestById(id);
                });
            })
        });
    }
}

module.exports = exportedMethods;