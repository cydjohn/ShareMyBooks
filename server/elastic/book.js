const client = require("../config/elasticsearch");

let exportedMethods = {
    createIndex() {
        client.indices.create({
            index: 'book'
        }, function (err, resp, status) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("create", resp);
            }
        });
    },
    addBook(book) {
        client.index({
            index: 'book',
            type: 'bookInfo',
            body: book
        }, function (err, resp, status) {
            console.log(resp);
        });
    },
    searchForBook(keywords){
        return client.search({
            q: keywords
        }).then(function (body) {
            var hits = body.hits.hits;
            return hits;
        }, function (error) {
            console.trace(error.message);
        });
    }
}

module.exports = exportedMethods;