const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
const uuid = require('node-uuid');
const time = require('time');
   

let exportedMethods = {

    getAllBooks() {
        return books().then((booksCollection) => {
            return booksCollection.find({}).toArray();
        });
    },
    addBook(book) {
        return books().then((booksCollection) => {
            let newBook = {
                _id: uuid.v4(),

                //Must Be user ID!!!
                uploadedBy: book.uploadedBy,

                Title: book.Title,
                Author: book.Author,
                bookPhotoID1: book.bookPhotoID1,
                bookPhotoID2: book.bookPhotoID2,
                bookPhotoID3: book.bookPhotoID3,
                Year: book.Year,
                Category: book.Category,
                Condition: book.Condition,
                Location: book.Location,
                Description: book.Description,
                bookPointsValue: book.bookPointsValue,
                timestampOfUpload: new time.Date(),
                numberOfRequests: 0,
                visibleBoolean: book.visibleBoolean
            };
            return booksCollection.insertOne(newBook).then((newBookInfo) => {
                return newBookInfo.insertedId;
            }).then((newId) => {
                return this.getBookById(newId);
            });
        }).catch((e) => {
            console.log("Error while adding book:", e);
        });
    },
    getBookById(id) {
       return books().then((booksCollection) => {
            return booksCollection.findOne({ _id: id }).then((book) => {
                if (!book) throw "Book not found";
                return book;
            });
        });
    },
    deleteBookById(id){
        return books().then((booksCollection) => {
            return booksCollection.removeOne({_id:id}).then((deletionInfo) =>{
                if (deletionInfo.deletedCount === 0) {
                    return (`Could not delete product with id of ${id}`)
                }
                else {
                    return "success"
                }
            }).catch((e) => {
                console.log("Error while removing book:", e);
            });
        });
    },
    addNumberOfRequestsOfId(id) {
        return books().then((booksCollection) => {
            return booksCollection.findOne({ _id: id }).then((book) => {
                if (!book) throw "Book not found";
                let updateData = {
                    numberOfRequests : book.numberOfRequests+1,
                }
                let updateCommand = {
                    $set: updateData
                }
                return booksCollection.updateOne({_id:id},updateCommand).then(() =>{
                    return this.getBookById(id);
                });
            });
        });
    }
}

module.exports = exportedMethods;