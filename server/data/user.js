const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const bcrypt = require("bcrypt-nodejs");

var userList = [  //user 1
    {
        "userUUID": "1",//in actual data will be much longer
        "firstName": "John",
        "lastName": "Doe",
        "userID": "jdoe",
        "passwordHash": "12345",//not hashed yet obviously
        "address": "45 Elm Street New York, NY 10028",//made up the address
        "email": "jdoe@gmail.com",
        "phoneNumber": "2123456789",
        "userPhotoID": "1",
        "userTotalPoints": 16
    },

    //user 2
    {
        "userUUID": "2",//in actual data will be much longer
        "firstName": "Sarah",
        "lastName": "Lin",
        "userID": "slin",
        "passwordHash": "67890",//not hashed yet obviously
        "address": "23 Madison Road San Fransisco, CA 09867",//made up the address
        "email": "slin@gmail.com",
        "phoneNumber": "9173247653",
        "userPhotoID": "2",
        "userTotalPoints": 16
    },

    //user 3
    {
        "userUUID": "3",//in actual data will be much longer
        "firstName": "Sam",
        "lastName": "Thompson",
        "userID": "sthompson",
        "passwordHash": "24680",//not hashed yet obviously
        "address": "45 Washington Street Hoboken, NJ 10028",//made up the address
        "email": "sthompson@gmail.com",
        "phoneNumber": "9175675478",
        "userPhotoID": "3",
        "userTotalPoints": 22
    },

    //user 4
    {
        "userUUID": "4",//in actual data will be much longer
        "firstName": "Lisa",
        "lastName": "Johnson",
        "userID": "ljohnson",
        "passwordHash": "13579",//not hashed yet obviously
        "address": "32 Pine Tree Road Ithaca, NY 14850",//made up the address
        "email": "ljohnson@gmail.com",
        "phoneNumber": "9172134543",
        "userPhotoID": "4",
        "userTotalPoints": 16
    },

    //user 5
    {
        "userUUID": "5",//in actual data will be much longer
        "firstName": "Jane",
        "lastName": "Anderson",
        "userID": "janderson",
        "passwordHash": "abcde",//not hashed yet obviously
        "address": "123 Cactus Lane Houston,TX 23415",//made up the address
        "email": "janderson@gmail.com",
        "phoneNumber": "9178736475",
        "userPhotoID": "5",
        "userTotalPoints": 16
    }];


let exportedMethods = {
    getAllUsers() {
        return users().then((usersCollection) => {
            return usersCollection.find({}).toArray();
        });
    },
    addUser(user) {
        console.log(user);
        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid.v4(),
                firstName: user.firstName,
                lastName: user.lastName,
                userID: user.userName,
                passwordHash: bcrypt.hashSync(user.password),
                address: user.address,
                email: user.email,
                phoneNumber: user.phoneNumber,
                userPhotoID: user.userPhotoID,
                userTotalPoints: user.userTotalPoints
            };
            return usersCollection.insertOne(newUser).then((result) => {
                return result.insertedId;
                // return result;
            }).then((newId) => {
                return this.getUserById(newId);
            });;
        });

    },
    getUserById(id) {
        return users().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });

    },

    //This method is used in the passport authentication strategy. cb - callback
    // getUserByEmailPassport(email, cb) {
    //     return users().then((usersCollection) => {
    //         return usersCollection.findOne({ email: email }).then((user) => {
    //             if (!user) return cb(null, null);;
    //             return cb(null, user);;
    //         });
    //     });
    // },
    getUserByID(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) {
                    console.log('User ' + id + ' does not exist');
                }
                return user;
            });
        });
    },

    //This method is used in the passport authentication deserializing. cb - callback
    // getUserByIDPassport(id, cb) {
    //     return users().then((usersCollection) => {
    //         return usersCollection.findOne({ _id: id }).then((user) => {
    //             if (!user) cb(new Error('User ' + id + ' does not exist'));
    //             return cb(null, user);
    //         });
    //     });
    // },
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


    updateUser(password, email) {
        return users().then((usersCollection) => {
            let updateUser = {
                password: bcrypt.hashSync(password)
            }
            let updateCommand = {
                $set: updateUser
            };
            return usersCollection.updateOne({ email: email }, updateCommand).then(() => {
                return this.getUserByEmail(email);
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
                return this.getUserByID(requestBody.userid);
            });
        });
    }
}

module.exports = exportedMethods;