const data = require("../data");
const express = require('express');
const router = express.Router();
const userRequestsData = data.userRequests;
const userData = data.user;


// only for debugging
router.get("/",(req, res)=>{
    userRequestsData.getAllRequests().then((requestList)=>{
        res.status(200).json(bookList);
    });
});

router.get("/:id",(req, res)=>{
    let requestId = req.params.id;
    userRequestsData.getRequestById(requestId).then(async (requestResult) => {
        let fromUserInfo = await userData.getUserById(requestResult.requestFrom);
        let toUserInfo = await userData.getUserById(requestResult.requestTo);
        res.status(200).json({requestResult,"fromUserInfo":fromUserInfo,"toUserInfo":toUserInfo});
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
                message: userRequestId
            });
        }
    });
});

router.post("updateRequestStatus/:id",(req,res) => {
    userRequestsData.updateUserRequestStatusById(req.params.id).then((userRequest)=>{
        
    });
});






module.exports = router;

