const app = require("express").Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/posts.controller.js");

const { likePost }= require('../controller/like.controller')



// Read posts
app.get("/", getPosts);

// Create posts
app.post("/newPost", createPost);

// Update posts
app.post("/updatePost/:id", updatePost);

// Delete posts
app.delete("/deletePost/:id", deletePost);

// Like post
app.post('/likepost/:id',likePost);


// Unlike post
app.post('/unlikepost/:id',likePost);



module.exports = app;
