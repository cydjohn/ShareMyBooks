const user = require("./user");
const book = require("./book");

const messageBoard = require("./messageBoard");
const privateMessage = require("./privateMessage");
const userRequests = require("./userRequests");

module.exports = {
    // books:books,
    user: user,
    book: book,
    messageBoard: messageBoard,
    userRequests: userRequests,
    privateMessage: privateMessage
};