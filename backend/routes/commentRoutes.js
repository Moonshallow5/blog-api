const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post('/add-comment',commentController.addComment);
router.get("/comments/:postId", commentController.getCommentByPost);

module.exports=router;