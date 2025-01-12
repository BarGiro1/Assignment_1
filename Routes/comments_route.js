const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");

router.post("/posts/:postId/comment", commentsController.addComment);

router.get("/posts/:postId/comments", commentsController.getCommentsByPost);

router.put("/:id", commentsController.updateComment);

router.delete("/:id", commentsController.deleteComment);

router.get("/", commentsController.getAllComments);

module.exports = router;
