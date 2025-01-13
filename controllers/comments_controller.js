const Comment = require("../models/comment");
const post = require("../models/post");
const Post = require("../models/post");

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { text, userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({ postId, text, userId });
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post.comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments", error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: id },
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment updated", comment: updatedComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Post.updateOne(
      { _id: deletedComment.postId },
      { $pull: { comments: id } }
    );

    res.json({ message: "Comment deleted", comment: deletedComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  const postId = req.query.post; 
  try {
    if (postId) {
      const comments = await Comment.find({ postId: postId });
      res.status(200).json(comments);
    } else {
      const comments = await Comment.find();
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(404)
      .json({ message: "Error retrieving comments", error: error.message });
  }
};
