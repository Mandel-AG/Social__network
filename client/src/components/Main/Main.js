import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./main.css";
import axios from "axios";
import { LikeButton } from "../index";


const Main = (props) => {
  const [posts, setPosts] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  const getPosts = async () => {
    const posts = await axios.get("/posts", {
      withCredentials: true,
    });
    setPosts(posts.data);
  };

  const onSubmit = (data) => {
    axios.post(
      "/posts/newPost",
      { ...data },
      { withCredentials: true }
    );
    document.querySelector(".input--postTweet").value = "";
    getPosts();
  };

  useEffect(() => {
    getPosts();
  },[]);

  const eachPost = posts.map((element) => (
    <div key={element._id} className='containerEachUser'>
      <div className='eachUseravatar'>
        {
          element.userId.avatar ?
            <img src={`/api/avatar/${element.userId.avatar}`} alt='avatar utilisateur' />
            :
            <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="default profile avatar"/>
        }
      </div>

      <div className='eachUserPseudo'>
        <p>{element.userId.username}</p>
      </div>

      <div className='eachUserPost'>{element.content}</div>

      <div className='eachUserPostTool'>
        <span>
        Posté le {element.date} à {element.hours} .
        </span>
        <LikeButton postId={element._id}/>
      </div>

    </div>
  ));

  return (
    <div className='containterMain'>
      <div className='mainHeader'>          

          <div className='mainform'>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className='input--postTweet'
                type='text'
                placeholder='Quoi de neuf ?'
                name='content'
                maxLength='120'
                minLength='1'
                ref={register({ required: "content required" })}
              />
            </form>
          </div>

          <div className='mainButton'>
            <button
            type='submit'
              className='buttonTweeterMain'
              onClick={handleSubmit(onSubmit)}
            >
              Poster
            </button>
          </div>
      </div>

      <div className='mainContent'>{eachPost.reverse()}</div>
    </div>
  );
};

export default Main;
