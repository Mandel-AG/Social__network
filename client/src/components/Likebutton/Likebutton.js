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
                if(e._id === props.postId){
                    setIsPostLiked(true)
                }
                return null;
            })     
        })
        axios.get(`/posts/${props.postId}`)
         .then((res)=>{
            setNumberOfLikes(res.data.likes.length)
         })
        .catch((err)=> console.log(err))
    },[props.postId])

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
                        <div className="likeButton__withCount">
                            <img onClick={unlikePost} src={liked} alt='liked button'/>   
                                {numberOfLikes  ?
                                    <span> {numberOfLikes}</span>
                                    :
                                    null
                                }  
                        </div>
                    :
                    <div className="likeButton__withCount">
                        <img onClick={likePost} src={like} alt='like button' />    
                        {numberOfLikes  ?
                            <span> {numberOfLikes}</span>
                            :
                            null
                        }
                    </div>      
                }
            </figure>         
        </div>
    )
}

export default LikeButton;