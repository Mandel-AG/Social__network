const User = require("../models/user.model.js")
const Post = require("../models/post.model");
const mongoose = require('mongoose')



exports.likePost = async (req,res,next) => {
  try{
     let user = req.user;
     const postId = req.params.id
     let post = await Post.findById(postId)
     await User.findByIdAndUpdate(
        {_id:user._id},
        { $push: { postLike: post } },
        { runValidators: true, useFindAndModify: false, new: true },
      
        )
      res.status(200).send(user)
    }
  catch(e){
    console.log(e)
  }
}

exports.unlikePost = async (req,res,next) => {
  try{
     let user = req.user;
     const postId = req.params.id
     let post = await Post.findById(postId)
     await User.findOneAndUpdate(
        {_id:user._id},
        { $pull: { postLike: {_id: mongoose.Types.ObjectId(postId)} } },
        { runValidators: true, 
          useFindAndModify: false, 
          new:true },(err, response) => {
            res.send(response)
          }
      )
    }
  catch(e){
    console.log(e)
  }
}