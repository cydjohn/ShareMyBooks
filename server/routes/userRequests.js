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
    }).catch((e) => {
        res.sendStatus(500);
    });
});

router.post("/",(req,res)=>{
    userRequestsData.addUserRequest(req.body).then((userRequest) => {
        if(!userRequest) {
            res.status(200).json({
                success: false,
                message: "Error while adding a user request!"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: userRequest
            });
        }
    });
});

router.delete("/:id",(req,res)=>{
    userRequestsData.deleteRequestById(req.params.id).then((userRequestId) =>{
        if(!userRequestId){
            res.status(200).json({
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






module.exports = router;

