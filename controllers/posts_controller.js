const PostModel = require("../models/post");

const getAllPosts = async (req, res) => {
    const senderFilter = req.query.sender; 
    try {
      if (senderFilter) {
        const posts = await PostModel.find({ sender: senderFilter });
        res.status(200).send(posts);
      } else {
        const posts = await PostModel.find();
        res.status(200).send(posts);
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  const createPost = async (req, res) => {
    const postBody = req.body; 
    try {
      const post = await PostModel.create(postBody);
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const updatePost = async (req, res) => {
    const postId = req.params.id;
    const postBody = req.body; 
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(postId, postBody, { new: true });
      if (updatedPost) {
        res.status(200).send(updatedPost);
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const deletePost = async (req, res) => {
    const postId = req.params.id; 
    try {
      const deletedPost = await PostModel.findByIdAndDelete(postId);
      if (deletedPost) {
        res.status(200).send({ message: "Post deleted successfully" });
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };