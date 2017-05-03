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

var bookImagePath = "../testImageMagick/";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//get all books where page=0 is the first set
router.get("/:page", (req, res) => {
    bookData.getAllBooks(req.params.page).then((bookList) => {
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
    let bookid = req.params.bookid;
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
router.post("/", (req, res) => {
    //let bookImagePath = req.file.path;
    var bookInfo = req.body;
    if (!bookInfo) {
        res.status(400).json({ error: "You must provide data to upload an book" });
        return;
    }

    if (!bookInfo.uploadedBy) {
        res.status(400).json({ error: "You must provide a user who uploaded the book" });
        return;
    }

    if (!bookInfo.Title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!bookInfo.Author) {
        res.status(400).json({ error: "You must provide an author" });
        return;
    }

    if (!bookInfo.Year) {
        res.status(400).json({ error: "You must provide a year" });
        return;
    }
    

    if (!bookInfo.Category) {
        res.status(400).json({ error: "You must provide a category" });
        return;
    }

    if (!bookInfo.Condition) {
        res.status(400).json({ error: "You must provide a condition" });
        return;
    }
    if (!bookInfo.Location) {
        res.status(400).json({ error: "You must provide a location" });
        return;
    }
    if (!bookInfo.Description) {
        res.status(400).json({ error: "You must provide a description" });
        return;
    }
    
    bookData.addBook(req.body).then(async (book) => {
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
                        bookid: book._id
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

router.delete("/:id", (req, res) => {
    bookData.deleteBookById(req.params.id).then((bookId) => {
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
    bookData.updateBookInfo(req.params.id, req.body).then((book) => {
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
    if (req.params.keyword === undefined) {
        res.status(200).json({message: "must provide a keyword"});
    }
    else {
        bookList = bookData.searchForBook(req.params.keyword).then((bookList) => {
            res.status(200).json(bookList);
        });
    }
});

router.get("/category/:category",(req,res) => {
   bookData.viewBooksByCategory(req.params.category).then((bookList) => {
       res.status(200).json(bookList);
   }); 
});


module.exports = router;