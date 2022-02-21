const User = require("../models/user.model.js")
const Post = require("../models/post.model");
const mongoose = require('mongoose')



exports.likePost = async (req,res,next) => {
  const addPost  = async(user,post) => {
    await User.findByIdAndUpdate(
    {_id:user._id},
    { $push: { postLike: post } },
    { runValidators: true, useFindAndModify: false, new: true },
    ).exec()
    .then ( (response) => {res.send(response)})
  }
  try{
     let user = req.user;
     const postId = req.params.id
     let post = await Post.findById(postId)
     user.postLike.length > 0 ?
      user.postLike.map(el => {
        if(el._id == postId){
          res.status(304).send('already liked')
        }
        else{
          addPost(user,post)
        }
      })
      :
      addPost(user,post)
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