import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./main.css";
import axios from "axios";

const Main = (props) => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState();
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

  const onChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    getPosts();
  },);

  const eachPost = posts.map((element) => (
    <div key={element._id} className='containerEachUser'>
      <div className='eachUseravatar'>
        <img src={`/api/avatar/${element.userId.avatar}`} alt='photo utilisateur' />
      </div>

      <div className='eachUserPseudo'>
        <p>{element.userId.username}</p>
      </div>

      <div className='eachUserPost'>{element.content}</div>

      <div className='eachUserPostTool'>
        Posté le {element.date} à {element.hours} .
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
                onChange={() => onChange}
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
