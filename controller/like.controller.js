const User = require("../models/user.model.js")
const Post = require("../models/post.model");
const mongoose = require('mongoose');




// exports.likePost = async (req,res,next) => {
//   const addPost  = async(user,post) => {
//     await Post.findByIdAndUpdate(
//       {_id:post._id},
//       {$inc:{likes:1}},
//       { runValidators: true, useFindAndModify: false, new: true }
//     ).exec()
//     .then ( (response) => {
//       console.log('nb of likes',response.likes)
//      })


//     await User.findByIdAndUpdate(
//     {_id:user._id},
//     { $push: { postLike: post } },
//     { runValidators: true, useFindAndModify: false, new: true },
//     ).exec()
//     .then ( (response) => {res.send(response)})
//   }
//   try{
//      let user = req.user;
//      const postId = req.params.id
//      let post = await Post.findById(postId)
//      user.postLike.length > 0 ?
//       user.postLike.map(el => {
//         if(el._id == postId){
//           res.status(304).send('already liked')
//         }
//         else{
//           addPost(user,post)
//         }
//       })
//       :
//       addPost(user,post)
//   }
//   catch(e){
//     console.log(e)
//   }
// }



exports.likePost = async (req,res,next) => {
  const addPost  = async(user,post) => {
    
    await User.findByIdAndUpdate(
    {_id:user._id},
    { $addToSet: { postLike: post } },
    { runValidators: true, useFindAndModify: false, new: true },
    ).exec()
    await Post.findByIdAndUpdate(
      {_id:post._id},
      {$addToSet:{likes:user._id}},
      { runValidators: true, useFindAndModify: false, new: true }
    ).exec()
  }
  try{
     let user = req.user;
     const postId = req.params.id
     let post = await Post.findById(postId)
     user.postLike.length > 0 ?
      user.postLike.map(el => {
        if(el._id == postId && post.likes.includes(user._id) ){
          res.json('already liked')
          return
        }
        else{
          addPost(user,post)
          res.send(user)
          return
        }
      })
      :
      addPost(user,post)
      res.send(user)
      return
  }
  catch(e){
    console.log(e)
  }
}


exports.unlikePost = async (req,res,next) => {
  try{
     let user = req.user;
     let userId = req.user._id;
     const postId = req.params.id
     await Post.findOneAndUpdate(
      {_id:postId},
      {$pull:{ likes:{  $in:[mongoose.Types.ObjectId(userId) ]}}},
      { runValidators: true, 
        useFindAndModify: false, 
        new: true },
    ).exec()
    
     await User.findOneAndUpdate(
        {_id:user._id},
        { $pull: { postLike: {_id: mongoose.Types.ObjectId(postId)} } },
        { runValidators: true, 
          useFindAndModify: false, 
          new:true }
    ).exec()
        res.send(user)
        return
      
    }
  catch(e){
    console.log(e)
  }
}