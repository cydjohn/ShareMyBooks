const bcrypt = require("bcrypt-nodejs");
const data = require("../data/");
const dbConnection = require("../config/mongoConnection");
const books = data.books;
const users = data.user;
const uuid = require('node-uuid');

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;

    }).then((db) => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "John",
            lastName: "Doe",
            userID: "jdoe",
            passwordHash: "12345",//not hashed yet obviously
            address: "45 Elm Street New York, NY 10028",//made up the address
            email: "jdoe@gmail.com",
            phoneNumber: "2123456789",
            userPhotoID: "1",
            userTotalPoints: 16
        }
        return users.addUser(requestBody);

    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
