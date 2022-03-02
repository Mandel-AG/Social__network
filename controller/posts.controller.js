const Post = require("../models/post.model");
const User = require("../models/user.model.js");
const mongoose = require("mongoose");



exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("userId");
    res.json(posts);
    // res.send(posts);
  } catch (error) {
    next()
  }
};


exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.findOne({_id:req.params.id}).populate("userId");
    res.json(posts);
    // res.send(posts);
  } catch (error) {
    next()
  }
};


exports.createPost = async (req, res, next) => {
  try {
    const content = req.body.content.trim();
    const post = new Post({
      content: content,
      date: new Date().toLocaleDateString().split(":"),
      hours: new Date().toLocaleTimeString().slice(0.7),
      userId: req.user,
    });

    await post.save();
    res.send(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const newPost = req.body;
    await Post.findByIdAndUpdate(
      postId,
      { $set: newPost },
      { runValidators: true, useFindAndModify: false }
    );
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.params.userId;
    await Post.findByIdAndDelete(postId);
    await User.updateMany({},
      { $pull: { postLike: {_id: mongoose.Types.ObjectId(postId)} } },
      { runValidators: true, 
        useFindAndModify: false, 
        new:true }
  ).exec()

    res.status(200).json("le post est effacé");
  } catch (error) {
    next(error);
  }
};
