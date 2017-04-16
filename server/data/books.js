const fs = require("fs");
const Promise = require('bluebird');
const path = require("path");
let users;


    let fileData = fs.readFileSync(__dirname + "/book.json");
    users = JSON.parse(fileData);
    console.log("Message from server/data/books.js: Read JSON data.")



let exportedMethods = {
    getAllBooks(){
        return new Promise((resolve, reject) => {
            resolve(users.slice(0, 25));
        });
    }
}

    module.exports=exportedMethods;