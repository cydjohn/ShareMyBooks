const express = require('express');
const router = express.Router();
const data = require("../data");
const infoData = data.user;
const url=require('url');

router.get("/:id", (req, res) => {
   infoData.getUserById(req.params.id).then((Userdesc) => {
        res.status(200).json({Userdesc});
    }).catch((error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    infoData.getAllUsers().then((UserList) => {
        res.status(200).json({UserList});
    }).catch((error)=>{
        console.log(error);
        if(error === "404")
            res.sendStatus(404);
        else
            res.sendStatus(500);
    });
});



module.exports = router;