const express = require('express');
const router = express.Router();
const data = require("../data");
const infoData = data.book;
const url=require('url');

router.get("/:id", (req, res) => {
   infoData.getBookById(req.params.id).then((Bookdesc) => {
        res.status(200).json({Bookdesc});
    }).catch((error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    infoData.getAllBooks().then((BookList) => {
        res.status(200).json({BookList});
    }).catch((error)=>{
        console.log(error);
        if(error === "404")
            res.sendStatus(404);
        else
            res.sendStatus(500);
    });
});




module.exports = router;