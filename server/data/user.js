const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const bcrypt = require("bcrypt-nodejs");
var xss = require('node-xss').clean;

let exportedMethods = {
    getAllUsers() {
        return users().then((usersCollection) => {
            return usersCollection.find({}).toArray();
        });
    },
    addUser(user) {

        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid.v4(),
                firstName: xss(user.firstName),
                lastName: xss(user.lastName),
                userID: xss(user.userID),
                passwordHash: bcrypt.hashSync(user.password),
                address: xss(user.address),
                email: decodeURIComponent(user.email),
                phoneNumber: xss(user.phoneNumber),
                userPhotoID: xss(user.userID),
                userTotalPoints: user.userTotalPoints
            };
            return usersCollection.findOne({ email: user.email }).then((user) => {
                if (user) throw "Email already exists.";
                else {
                    return usersCollection.insertOne(newUser).then((result) => {
                        return result.insertedId;
                        // return result;
                    }).then((newId) => {

                        return this.getUserById(newId);
                    });
                }
            });
        });

    },
    getUserByUserId(id) {
        return users().then((userCollection) => {
            return userCollection.findOne({ userID: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });

    },
    //This method is used in the passport authentication deserializing. cb - callback
    getUserByIDPassport(id, cb) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) cb(new Error('User ' + id + ' does not exist'));
                return cb(null, user);
            });
        });
    },


    // This method is used in the passport authentication strategy. cb - callback
    getUserByEmailPassport(email, cb) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ email: email }).then((user) => {
                if (!user) return cb(null, null);;
                return cb(null, user);;
            });
        });
    },

    getUserById(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) {
                    console.log('User ' + id + ' does not exist');
                }
                return user;
            });
        });
    },
    updateUser(id, updateUser) {
        if (!id || !updateUser || id == undefined || updateUser == undefined) {
            return Promise.reject("Please valid input for user.\n");
        }
        return users().then((usersCollection) => {
            let updatedUserData = {};
            if (updateUser.firstName) {
                updatedUserData.firstName = xss(updateUser.firstName);
            }

            if (updateUser.lastName) {
                updatedUserData.lastName = xss(updateUser.lastName);
            }

            if (updateUser.userID) {
                updatedUserData.userID = xss(updateUser.userID);
            }

            if (updateUser.address) {
                updatedUserData.address = xss(updateUser.address);
            }

            if (updateUser.email) {
                updatedUserData.email = xss(updateUser.email);
            }

            if (updateUser.phoneNumber) {
                updatedUserData.phoneNumber = xss(updateUser.phoneNumber);
            }

            if (updateUser.userPhotoID) {
                updatedUserData.userPhotoID = xss(updateUser.userPhotoID);
            }

            if (updateUser.userTotalPoints) {
                updatedUserData.userTotalPoints = updateUser.userTotalPoints;
            }

            if (updateUser.passwordHash) {
                updatedUserData.passwordHash = bcrypt.hashSync(updateUser.passwordHash);
            }

            let updateCommand = {
                $set: updatedUserData
            };
            return usersCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getUserById(id);
            }).catch((err) => {
                console.log("Error while updating user:", err);
            });

        });

    },
    deleteUserById(id){
        return books().then((booksCollection)=>{
            return booksCollection.deleteOne({_id:id}).then((deletionInfo)=>{
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${id}`
                }
                else {
                    return id;
                }
            }).catch((e) => {
                console.log("Error while removing user:", e);
            });
        });
        
    },


    updateUserPic(requestBody) {
        return users().then((usersCollection) => {
            let updateUser = {
                imagePath: requestBody.image
            }
            let updateCommand = {
                $set: updateUser
            };
            return usersCollection.updateOne({ _id: requestBody.userid }, updateCommand).then(() => {
                return this.getUserById(requestBody.userid);
            });
        });
    },

    updateUserTotalPoints(userid, points){
        return users().then((usersCollection) => {
            return usersCollection.findOne({ userID: userid }).then((requestedUser) => {
                if (!requestedUser) throw "user not foound";
                let updateData = {
                    userTotalPoints: requestedUser.userTotalPoints + points
                }
                let updateCommand = {
                    $set: updateData
                }
                return userRequestsCollection.updateOne({ _id: user_id }, updateCommand).then(() => {
                    return this.getRequestById(id);
                });
            })
        });
    }
}

module.exports = exportedMethods;