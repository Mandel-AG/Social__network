const app = require("express").Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/posts.controller.js");

const { likePost, unlikePost }= require('../controller/like.controller')



// Read posts
app.get("/", getPosts);

// Read One post
app.get("/:id", getPost);

// Create posts
app.post("/newPost", createPost);

// Update posts
app.post("/updatePost/:id", updatePost);

// Delete posts
app.delete("/deletePost/:id", deletePost);

// Like post
app.post('/likepost/:id',likePost);


// Unlike post
app.post('/unlikepost/:id',unlikePost);



module.exports = app;
