import React, { useEffect, useState } from "react";
import "./asideRight.css";
import axios from "axios";

function AsideRight(props) {
  const [ownPosts, setOwnPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const getMyPosts = async () => {
    await axios
      .get("/posts", { withCredentials: true })
      .then((posts) => posts.data)
      .then((element) => {
        const posts = element.map((post) => post);
        setOwnPosts(posts);
      });
  };

  useEffect(() => {
    if (props.currentUser) {
      setCurrentUser(props.currentUser);
    }
    getMyPosts();
  }, []);

  const deletePost = (postId) => {
    let confirm = window.confirm(
      "êtes-vous sûr de vouloir supprimer ce Sweet ?"
    );
    if (confirm) {
      axios.delete("/posts/deletePost/" + postId, {
        withCredentials: true,
      });
    }
    getMyPosts();
  };

  const myPost = ownPosts.filter(
    (post) => post.userId.email === props.currentUser.email
  );
  const eachOfMyPost = myPost.map((element) => (
    <div key={element._id} className='myFakeTweets'>
      <div className='myFakeTweets__content'>{element.content}</div>
      <div className='myFakeTweets__date'>
        Posté le {element.date} à {element.hours} .
      </div>
      <button onClick={() => deletePost(element._id)}> Effacer </button>
    </div>
  ));

  return (
    <div className='containerRight'>
      {/* <div className='rightSearchBar'>
        <input type='text' placeholder='Recherche posts' />
      </div> */}

      <div className='rightTitle'>
        <h3>Mes posts :</h3>
      </div>

      <div className='rightContent'>{eachOfMyPost.reverse()}</div>
    </div>
  );
}

export default AsideRight;
