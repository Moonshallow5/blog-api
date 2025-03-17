const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post('/add-post',postController.addPost);
router.get('/user/:userId',postController.getPostByUser);
router.get('/posts/:id',postController.getPostById);
router.delete('/delete-post/:id',postController.deletePost);

module.exports=router