const data = require("../data");
const express = require('express');
const router = express.Router();
const userRequestsData = data.userRequests;


// only for debugging
router.get("/",(req, res)=>{
    userRequestsData.getAllRequests().then((requestList)=>{
        res.status(200).json(bookList);
    });
});

router.get("getRequestById/:id",(req, res)=>{
    let requestId = req.params.id;
    userRequestsData.getRequestById(requestId).then((requestResult) => {
        
        res.status(200).json(requestResult);
    }, () => {
       
        res.sendStatus(500);
    });
});






module.exports = router;

