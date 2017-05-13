const express = require('express');
const router = express.Router();
const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();
const redisConnection = require("../redis-connection");
const nrpSender = require("./nrp-sender-shim");
const fs = require('fs');
const im = require('imagemagick');
const path = require("path");
const data = require("../data");
const bookData = data.book;
const xss = require("xss");
const multer = require('multer');
const upload = multer({ dest: "./uploads" });
const userData = data.user;


var bookImagePath = "../testImageMagick/";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/", (req, res) => {
    bookData.getAllBooks().then((bookList) => {
        res.status(200).json(bookList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});
//get all books where page=0 is the first set
router.get("/page/:page", (req, res) => {
    let page = xss(req.params.page);
    bookData.getAllBooks(page).then((bookList) => {
        res.status(200).json(bookList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

//get recently uploaded books where page=0 is the first set with a total of 12 books in all for 2 pages
router.get("/recent/:page", (req, res) => {
    let page = xss(req.params.page);
    bookData.getRecentlyUploadedBooks(page).then((bookList) => {
        res.status(200).json(bookList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

//get all book categories
router.get("/categories", (req, res) => {
    bookData.getAllBookCategories().then((categoryList) => {
        res.status(200).json(categoryList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

//get 1 book
router.get("/:bookid", (req, res) => {
    let bookid = xss(req.params.bookid);
    bookData.getBookById(bookid).then((bookResult) => {
        res.status(200).json(bookResult);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});


//to test imageMagick using a worker
router.get("/image/resizeworker/:id", async (req, res) => {
    let bookPath = bookImagePath + req.params.id + '.jpg';
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "convertBookImageToThumbnailAndPageImg",
            data: {
                image: bookPath,
                bookid: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
});

//upload book to database and add book image to thumnail and book page folders

router.post("/",upload.single('photo'), (req, res) => {

    let bookImagePath = req.file.path;
    var bookInfo = req.body;
    let uploadedBy = xss(req.body.uploadedBy);
    let Title = xss(req.body.Title);
    let Author = xss(req.body.Author);
    let Year = xss(req.body.Year);
    let Category = xss(req.body.Category);
    let Condition = xss(req.body.Condition);
    let Location = xss(req.body.Location);
    let Description = xss(req.body.Description);

    let newBookObj = {
        uploadedBy : uploadedBy,
    Title : Title,
     Author : Author,
     Year : Year,
     Category : Category,
     Condition : Condition,
     Location : Location,
     Description: Description
    }

    if (!bookInfo) {
        res.status(400).json({ error: "You must provide data to upload an book" });
        return;
    }

    if (!uploadedBy) {
        res.status(400).json({ error: "You must provide a user who uploaded the book" });
        return;
    }

    if (!Title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!Author) {
        res.status(400).json({ error: "You must provide an author" });
        return;
    }

    if (!Year) {
        res.status(400).json({ error: "You must provide a year" });
        return;
    }



    if (isNaN(Year) === true ) {// returns true if the variable does NOT contain a valid number
        res.status(400).json({ error: "You must provide a year and it must be a 4 digit number" });
        return;
    }

    if (!Category) {
        res.status(400).json({ error: "You must provide a category" });
        return;
    }
    if (!Condition) {
        res.status(400).json({ error: "You must provide a condition" });
        return;
    }
    if (!Location) {
        res.status(400).json({ error: "You must provide a location" });
        return;
    }
    if (!Description) {
        res.status(400).json({ error: "You must provide a description" });
        return;
    }

return userData.getUserById(uploadedBy).then((userResult)=>{
    newBookObj.uploadedBy = userResult.userID;
    bookData.addBook(newBookObj).then(async (book) => {
        if (!book) {
            return res.status(200).json({
                success: false,
                message: "Error while adding a book!"
            });
        }
        else {
            //send user image to worker to become a thumbnail
            let response;
            try {
                response = await nrpSender.sendMessage({
                    redis: redisConnection,
                    eventName: "convertBookImageToThumbnailAndPageImg",
                    data: {
                        image: bookImagePath,
                        bookid: book.bookPhotoID1
                    }
                });

            } catch (e) {
                res.json({ error: e.message });
            }
            res.status(200).json({
                success: true,
                message: book,
                message2: response
            });
        }
    });
});

    
});

router.delete("/:id", (req, res) => {
    let id = xss(req.params.id);
    bookData.deleteBookById(id).then((bookId) => {
        if (!bookId) {
            return res.status(200).json({
                success: false,
                message: "Error while deleting a book!"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: bookId
            });
        }
    });
});

router.put("/:id", (req, res) => {
    let updatedBook = xss(req.body);
    let updatedBookID = xss(req.params.id);
    bookData.updateBookInfo(updatedBookID, updatedBook).then((book) => {
        if (!book) {
            res.status(200).json({
                success: false,
                message: "Error while updating a book!"
            });
        }
        else {

            res.status(200).json({
                success: true,
                message: book
            });
        }
    });
});

router.get("/search/:keyword", (req, res) => {
    let keyword = xss(req.params.keyword);
    if (keyword === undefined) {
        res.status(200).json({ message: "must provide a keyword" });
    }
    else {
        bookList = bookData.searchForBook(keyword).then((bookList) => {
            res.status(200).json(bookList);
        });
    }
});

router.get("/category/:category", (req, res) => {
    let category = xss(req.params.category);
    bookData.viewBooksByCategory(category).then((bookList) => {
        res.status(200).json(bookList);
    });
});

router.post("/searchByCategory", (req, res) => {
    let keyword = xss(req.body.keyword);
    let category = xss(req.body.category);
   bookData.searchForBookByCategory(keyword, category).then((bookList) => {
        res.status(200).json(bookList);
    });
})


module.exports = router;