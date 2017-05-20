const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}


module.exports = {
    books: getCollectionFn("books"),
    messageBoard : getCollectionFn("messageBoard"),
    privateMessage : getCollectionFn("privateMessage"),
    users : getCollectionFn("users"),
    userRequests : getCollectionFn("userRequests")
};

