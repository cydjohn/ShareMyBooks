const mongoCollections = require("../config/mongoCollections");
const es = require("../elastic");
const elasticsearch = es.book;
const books = mongoCollections.books;
const users = mongoCollections.users;
const uuid = require('node-uuid');
var moment = require('moment');
const data = require("../data");
const userData = data.user;



let exportedMethods = {
    getAllBooks(page) {
        return books().then((booksCollection) => {
            return booksCollection.find({}).toArray();
        }).then((bookInfo)=>{
            let bookArray=[];
            let bookList=[];
            let currentPage = 0;
            //split list into groups of 9 book starting from index 0 with 9 per group
            while (bookInfo.length > 0) {
                bookArray.push(bookInfo.splice(0, 9));
            }

            //set current page if specifed as get variable (eg: /?page=2)
            if (typeof page !== 'undefined') {
                currentPage = parseInt(page);
            }

            //show list of users from group
            bookList = bookArray[currentPage];
            return bookList;
        });
    },
    getRecentlyUploadedBooks(page) {
        return books().then((booksCollection) => {
            return booksCollection.find({}).sort({ timestampOfUpload: -1 }).limit(12).toArray();
        }).then((bookInfo) => {
            let bookArray = [];
            let bookList = [];
            let currentPage = 0;
            //split list into groups of 9 book starting from index 0 with 9 per group
            while (bookInfo.length > 0) {
                bookArray.push(bookInfo.splice(0, 9));
            }

            //set current page if specifed as get variable (eg: /?page=2)
            if (typeof page !== 'undefined') {
                currentPage = parseInt(page);
            }

            //show list of users from group
            bookList = bookArray[currentPage];
            return bookList;
        });
    },
    calculateBooksPointsValue(book) {
        let currentPoints = 0;
        var date = 1;//new Date();
        var currentYear = 2017;//date.getFullYear();
        //if 2009 + 5 = 2014 < 2017
        if (book.Year + 5 < currentYear) {
            currentPoints = 3;
        }
        else if (book.Year + 10 < currentYear) {
            currentPoints = 2;
        }
        else {
            currentPoints = 1;
        }
        if (book.Condition == "great") {
            currentPoints += 3;
        }
        else if (book.Condition == "good") {
            currentPoints += 2;
        }
        else {
            //condition is poor
            currentPoints += 1;
        }
        return currentPoints;
    },
    addBook(book) {
        console.log(book)
        return books().then((booksCollection) => {
            let id = uuid.v4();
            if(book.bookPhotoID1 == null){
                book.bookPhotoID1 = uuid.v4();
            }
            let bookPointsValueCalculation = this.calculateBooksPointsValue(book);
            let newBook = {
                _id: id,
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
                bookPointsValue: bookPointsValueCalculation,
                timestampOfUpload: moment().format(),
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
                            book.bookUUID = book["_id"];
                            delete book["_id"];
                            elasticsearch.addBook(book);
                        }).catch((e) => {
                            throw "Error while adding book to elastic search";
                        });
                        return this.getBookById(newId);
                    }).then((book) => {
                        this.updateUserPoints(book._id, book.uploadedBy, book.bookPointsValue).then((book) => {
                            return this.getBookById(book._id);
                        });
                        return this.getBookById(book._id);
                    });

                }
            });

        }).catch((e) => {
            console.log("Error while adding book:", e);
        });
    },
    updateUserPoints(bookid, userid, points) {
        //return userData.updateUserTotalPoints(userid,points).then((user)=>{
        //  return user;
        //})
        return users().then((usersCollection) => {
            return usersCollection.findOne({ userID: userid }).then((requestedUser) => {
                if (!requestedUser) throw "user not foound";
                let updateData = {
                    userTotalPoints: requestedUser.userTotalPoints + points
                }
                let updateCommand = {
                    $set: updateData
                }
                return usersCollection.updateOne({ userID: userid }, updateCommand).then((updatedUser) => {
                    return this.getBookById(bookid);
                });
            })
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
    getBookByUserId(userid) {
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

            if (updateBook.Title) {
                updatedBookData.title = updateBook.title;
            }

            if (updateBook.Author) {
                updatedBookData.Author = updateBook.Author;
            }

            if (updateBook.bookPhotoID1) {
                updatedBookData.bookPhotoID1 = updateBook.bookPhotoID1;
            }

            if (updateBook.bookPhotoID2) {
                updatedBookData.bookPhotoID2 = updateBook.bookPhotoID2;
            }

            if (updateBook.bookPhotoID3) {
                updatedBookData.bookPhotoID3 = updateBook.bookPhotoID;
            }

            if (updateBook.Year) {
                updatedBookData.Year = updateBook.Year;
            }

            if (updateBook.Category) {
                updatedBookData.Category = updateBook.Category;
            }

            if (updateBook.Condition) {
                updatedBookData.Condition = updateBook.Condition;
            }

            if (updateBook.Location) {
                updatedBookData.Location = updateBook.Location;
            }

            if (updateBook.Description) {
                updatedBookData.Description = updateBook.Description;
            }

            if (updateBook.bookPointsValue && typeof (updateBook.bookPointsValue) == "number") {
                updatedBookData.bookPointsValue = updateBook.bookPointsValue;
            }

            if (updateBook.visibleBoolean === false) {
                updatedBookData.visibleBoolean = false;
            }
            else if (updateBook.visibleBoolean === true) {
                updatedBookData.visibleBoolean = true;
            }


            let updateCommand = {
                $set: updatedBookData
            };
            return booksCollection.updateOne({ _id: id }, updateCommand).then(() => {
                // elasticsearch.updateBook(id,updatedBookData);
                return this.getBookById(id);
            }).catch((err) => {
                console.log("Error while updating book:", err);
            });

        });
    },
    searchForBook(searchText) {
        return elasticsearch.searchForBook(searchText).then((bookList) => {
            result = [];
            bookList.forEach(function (book) {
                book["_source"]._id = book["_source"]["bookUUID"];
                delete book["_source"]["bookUUID"];
                result.push(book["_source"]);
            }, this);
            return result;
        });
    },
    searchForBookByCategory(searchText, category) {
        return elasticsearch.searchForBookByCategory(searchText, category).then((bookList) => {
            result = [];
            bookList.forEach(function (book) {
                book["_source"]._id = book["_source"]["bookUUID"];
                delete book["_source"]["bookUUID"];
                result.push(book["_source"]);
            }, this);
            return result;
        });
    },
    getAllBookCategories() {
        let categoryList = [];
        return books().then((booksCollection) => {
            return booksCollection.find({}).toArray().then((books) => {
                books.forEach(function (book) {
                    if (categoryList.indexOf(book.Category) == -1) {
                        //Not in the array!
                        categoryList.push(book.Category);
                    }
                });
                return categoryList;
            });
        });
    },
    viewBooksByCategory(category) {
        return books().then((booksCollection) => {
            return booksCollection.find({ Category: category }).toArray();
        })
    }
}

module.exports = exportedMethods;