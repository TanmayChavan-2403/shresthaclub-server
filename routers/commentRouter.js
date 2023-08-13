const express = require("express");
const router = express.Router();
const { addComment, replyToComment, ReplyToCommentTEST, fetchComments} = require("../handlers/commentRouteHandlers")

router.post("/add", addComment);
router.post("/reply", replyToComment);
router.post("/testReplyFunc", ReplyToCommentTEST)
router.get("/fetchComments", fetchComments)

module.exports = router;
