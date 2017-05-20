const data = require("../data");
const express = require('express');
const router = express.Router();
const userRequestsData = data.userRequests;
const userData = data.user;
const bookData = data.book;
const xss = require("xss");

// only for debugging
router.get("/", (req, res) => {
    userRequestsData.getAllRequests().then((requestList) => {
        res.status(200).json(requestList);
    });
});

router.get("/viewRequestByFromUserId/:id", (req, res) => {
    let id = xss(req.params.id);
    userRequestsData.viewRequestByFromUserId(id).then(async (userRequest) => {
        var result = []
        for (var ur in userRequest) {
            let fromUserInfo = await userData.getUserByUserId(userRequest[ur].requestFrom);
            let toUserInfo = await userData.getUserByUserId(userRequest[ur].requestTo);
            let book = await bookData.getBookById(userRequest[ur].bookId);
            result.push({ requestResult: userRequest[ur], "fromUserInfo": fromUserInfo, "toUserInfo": toUserInfo, "bookName":book.Title })
        } res.status(200).json({
            success: true,
            message: result
        });
    });
});


router.get("/viewRequestByToUserId/:id", (req, res) => {
    let id = xss(req.params.id);
    userRequestsData.viewRequestByToUserId(id).then(async (userRequest) => {
        var result = []
        for (var ur in userRequest) {
            let fromUserInfo = await userData.getUserByUserId(userRequest[ur].requestFrom);
            let toUserInfo = await userData.getUserByUserId(userRequest[ur].requestTo);
            let book = await bookData.getBookById(userRequest[ur].bookId);
            result.push({ requestResult: userRequest[ur], "fromUserInfo": fromUserInfo, "toUserInfo": toUserInfo, "bookName":book.Title })
        } res.status(200).json({
            success: true,
            message: result
        });
    });
});


router.get("/:id", (req, res) => {
    let requestId = xss(req.params.id);
    userRequestsData.getRequestById(requestId).then(async (requestResult) => {
        let fromUserInfo = await userData.getUserByUserId(requestResult.requestFrom);
        let toUserInfo = await userData.getUserByUserId(requestResult.requestTo);
        let book = await bookData.getBookById(requestResult.bookId);
        res.status(200).json({
            success: true,
            message: { requestResult, "fromUserInfo": fromUserInfo, "toUserInfo": toUserInfo, "bookName":book.Title }
        });
    }).catch((e) => {
        res.status(200).json({
            success: false,
            message: e
        });
    });
});

router.post("/", (req, res) => {
     var requestInfo = req.body;
     console.log(req.body)
     let requestFrom = xss(req.body.requestFrom);
     let requestTo = xss(req.body.requestTo);
     let bookId = xss(req.body.bookId);
     let userRequestObj = {
         requestFrom: requestFrom,
         requestTo: requestTo,
         bookId: bookId
     }
    if (!requestInfo) {
        res.status(400).json({ error: "You must provide data to request a book" });
        return;
    }

    if (!requestFrom) {
        res.status(400).json({ error: "You must provide a user to send request from" });
        return;
    }

    if (!requestTo) {
        res.status(400).json({ error: "You must provide a user to send request to" });
        return;
    }

    if (!bookId) {
        res.status(400).json({ error: "You must provide a book id" });
        return;
    }

    userRequestsData.addUserRequest(userRequestObj).then((userRequest) => {
        if (!userRequest) {
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

router.delete("/:id", (req, res) => {
    let id = xss(req.params.id);
    userRequestsData.deleteRequestById(id).then((userRequestId) => {
        if (!userRequestId) {
            res.status(200).json({
                success: false,
                message: "Error while deleting a user request!"
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

//  accept as status=1, 
//  reject as status=0, 
//  initial status of -1.
router.put("/acceptUserRequest/:id", (req, res) => {
    let id = xss(req.params.id);
    userRequestsData.acceptUserRequest(id).then((userRequest) => {
        if (!userRequest) {
            res.status(200).json({
                success: false,
                message: "Error while updating a user request!"
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

router.put("/rejectUserRequest/:id", (req, res) => {
    let id = xss(req.params.id);
    userRequestsData.rejectUserRequest(id).then((userRequest) => {
        if (!userRequest) {
            res.status(200).json({
                success: false,
                message: "Error while updating a user request!"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: userRequest
            });
        }
    }).catch((e) => {
        res.status(200).json({
            success: false,
            message: "Error while updating a user request!"
        });
    });
});



module.exports = router;

