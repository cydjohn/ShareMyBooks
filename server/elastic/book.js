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
    updateBook(id,book) {
        searchForBook(id)
        return client.update({
            index: 'book',
            type: 'bookInfo',
            id: id,
            body: {
                book
            }
        });
    },
    searchForBook(keywords) {
        return client.search({
            q: keywords
        }).then(function (body) {
            var hits = body.hits.hits;
            return hits;
        }, function (error) {
            console.trace(error.message);
        });
    }
    // searchForBookByCategory(keywords, category) {

    // }
}

module.exports = exportedMethods;