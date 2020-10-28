import React, { useEffect, useState } from "react";
import "./explorer.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Explorer() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const posts = await axios.get('/api/posts');
    setPosts(posts.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const eachPost = posts.map((element) => (
    <div key={element._id} className='containerEachUser'>
      <div className='eachUseravatar'>
        <img src={`/api/avatar/${element.userId.avatar}`} alt='utilisateur' />
      </div>

      <div className='eachUserPseudo'>{element.userId.username}</div>

      <div className='eachUserPost'>{element.content}</div>

      <div className='eachUserPostTool'>
        Posté le {element.date} à {element.hours} .
      </div>
    </div>
  ));

  return (
    <div className='container__Explorer'>
      <div className='explorer__AsideLeft'>
        <ul className='AsideLeft__ul'>



          <Link to='/login'> 
            <button className='AsideLeft__button'>
            Login
            </button>
          </Link>

          <Link to='/register'>
            <button className='AsideLeft__button'>
             Signup
            </button>
          </Link>
        </ul>

      
        
      </div>

      <div className='explorer__AsideRight'>
        <div className='AsideRight__header'>
          <h2>Les derniers posts</h2>
        </div>

        {eachPost}
      </div>
    </div>
  );
}

export default Explorer;
