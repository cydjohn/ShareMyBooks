const mongoCollections = require("../config/mongoCollections");
const es = require("../elastic");
const elasticsearch = es.book;
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

            return booksCollection.findOne({ Title: book.Title }).then((book) => {
                if (book) {
                    throw "Book already exists.";
                    // return book;
                }
                else {
                    return booksCollection.insertOne(newBook).then((newBookInfo) => {
                        return newBookInfo.insertedId;
                    }).then((newId) => {
                        this.getBookById(newId).then((book) => {
                            // delete book[_id];
                        // elasticsearch.addBook(book);
                        });
                        return this.getBookById(newId);
                    });
                }
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
    deleteBookById(id) {
        return books().then((booksCollection) => {
            return booksCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete book with id of ${id}`
                }
                else {
                    return id;
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
                    numberOfRequests: book.numberOfRequests + 1,
                }
                let updateCommand = {
                    $set: updateData
                }
                return booksCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getBookById(id);
                });
            });
        });
    },
    updateBookInfo(id, updateBook) {
        if (!id || !updateBook || id == undefined || updateBook == undefined) {
            return Promise.reject("Please valid input for your book.\n");
        }

        return books().then((booksCollection) => {
            let updatedBookData = {};

            if(updateBook.Title){
                updatedBookData.title = updateBook.title;
            }
            
            if(updateBook.Author) {
                updatedBookData.Author = updateBook.Author
            }

            if(updateBook.bookPhotoID1) {
                updatedBookData.bookPhotoID1 = updateBook.bookPhotoID1;
            }

            if(updateBook.bookPhotoID2) {
                updatedBookData.bookPhotoID2 = updateBook.bookPhotoID2;
            }

            if(updateBook.bookPhotoID3) {
                updatedBookData.bookPhotoID3 = updateBook.bookPhotoID3;
            }

            if(updateBook.Year) {
                updatedBookData.Year = updateBook.Year;
            }

            if(updateBook.Category) {
                updatedBookData.Category = updateBook.Category;
            }
                
            if(updateBook.Condition) {
                updatedBookData.Condition = updateBook.Condition;
            }

            if(updateBook.Location) {
                updatedBookData.Location = updateBook.Location;
            }

            if(updateBook.Description) {
                updatedBookData.Description = updateBook.Description;
            }

            if(updateBook.bookPointsValue){
                updatedBookData.bookPointsValue = updateBook.bookPointsValue;
            }

            if(updateBook.visibleBoolean === false) {
                updatedBookData.visibleBoolean = false;
            }
            else if(updateBook.visibleBoolean === true) {
                updatedBookData.visibleBoolean = true;
            }

            let updateCommand = {
                $set: updatedBookData
            };
            return booksCollection.updateOne({ _id: id},updateCommand).then(() => {
                return this.getBookById(id);
            }).catch((err) => {
                console.log("Error while updating book:", err);
            });

        });
    },
    searchForBook(searchText) {
        
    }
}

module.exports = exportedMethods;