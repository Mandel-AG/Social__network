import React, { useState, useEffect } from "react";
import like from '../utils/like.png'
import liked from '../utils/liked.png'
import './likebutton.css'
import axios from "axios";



function LikeButton(props){
    
    const [isPostLiked, setIsPostLiked ] = useState(false);
    let [numberOfLikes, setNumberOfLikes ] = useState(0);


    useEffect(()=>{
        axios
        .get("/user/currentUser", { withCredentials: true })
        .then((response) => {
            let postList = response.data.postLike;
            postList.map(e => {
                if(e._id == props.postId){
                    setIsPostLiked(true)
                }
            })     
        })
        axios.get(`/posts/${props.postId}`)
         .then((res)=>{
            setNumberOfLikes(res.data.likes.length)
         })
        .catch((err)=> console.log(err))
    },[])

    const likePost = async() => {
       await axios.post(`/posts/likePost/${props.postId}`)
       .then(()=>{
            setIsPostLiked(true)
            setNumberOfLikes(numberOfLikes+1)
        })
        .catch((e) => {
            console.log(e)
        })
    }

    const unlikePost = async() => {
        await axios.post(`/posts/unlikePost/${props.postId}`)
        .then(()=>{
            setIsPostLiked(false)
            setNumberOfLikes(numberOfLikes-1)

        })
        .catch((e) => {
            console.log(e)
        })
     }



    return(
        <div className="containerLikebutton">
            <figure>
                {
                    isPostLiked ?
                    <img onClick={unlikePost} src={liked} /> 
                    :
                    <img onClick={likePost} src={like} />
                }
            </figure>
            <span> {numberOfLikes}</span>
        </div>
    )
}

export default LikeButton;