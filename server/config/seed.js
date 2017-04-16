const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const books = data.book;
const messageBoard = data.messageBoard;
const users = data.user;
const privateMessages = data.privateMessage;
const userRequests = data.userRequests;

var user1 = 
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
    };

var user2 = 
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
    };

var user3 = 
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
    };

var user4 = 
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
    };

var user5 = 
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
    };

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return users.addUser(user1);
    }).then(() => {
        return users.addUser(user2);
    }).then(() => {
        return users.addUser(user3);
    }).then(() => {
        return users.addUser(user4);
    }).then(() => {
        return users.addUser(user5);
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});