const app = require("express").Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/posts.controller.js");

// Read posts
app.get("/", getPosts);

// Create posts
app.post("/newPost", createPost);

// Update posts
app.post("/updatePost/:id", updatePost);

// Delete posts
app.delete("/deletePost/:id", deletePost);

module.exports = app;
