import React, { useState, useEffect } from "react";
import like from '../utils/like.png'
import liked from '../utils/liked.png'
import './likebutton.css'
import axios from "axios";



function LikeButton(props){
    
    const [isPostLiked, setIsPostLiked ] = useState();


    useEffect(()=>{
        axios
        .get("/user/currentUser", { withCredentials: true })
        .then((response) => {
            let postList = response.data.postLike;
            postList.map(e => {
                e._id === props.postId ? setIsPostLiked(true) : setIsPostLiked(false)
            })
            console.log('response',response)
        })
    },[])

    const likePost = async() => {
       await axios.post(`/posts/unlikePost/${props.postId}`)
       .then((res)=>{
        // let test = postList.some((posts) => postId)
        // console.log(test)
        console.log(res)
        console.log(isPostLiked)
       })
       .catch((e) => {
           console.log(e)
       })
    }

    const unlikePost = async() => {
        await axios.post(`/posts/likePost/${props.postId}`)
        .then((res)=>{
         console.log(res)
         console.log(isPostLiked)
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
                    <img onClick={unlikePost} src={like} />
                }
            </figure>
        </div>
    )
}

export default LikeButton;