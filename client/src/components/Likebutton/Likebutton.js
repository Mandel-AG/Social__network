import React, { useState, useEffect } from "react";
import like from '../utils/like.png'
import liked from '../utils/liked.png'
import './likebutton.css'
import axios from "axios";



function LikeButton(props){

    let oui = async() => {
        console.log(props)
       await axios.post(`/posts/unlikePost/${props.postId}`)
       .then((res)=>{
        console.log(res)
       })
       .catch((e) => {
           console.log(e)
       })
    }


    return(
        <div className="containerLikebutton">
            <figure>
                <img onClick={oui} src={like} />
            </figure>
        </div>
    )
}

export default LikeButton;