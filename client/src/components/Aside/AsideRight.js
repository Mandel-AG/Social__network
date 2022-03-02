import React, { useEffect, useState } from "react";
import "./asideRight.css";
import axios from "axios";

function AsideRight(props) {
  const [ownPosts, setOwnPosts] = useState([]);

  const getMyPosts = async () => {
    const posts1 = await axios.get("/posts", { withCredentials: true })

    await setOwnPosts(posts1.data);
    return
      
  };

  useEffect(() => {
    getMyPosts();
  }, [ownPosts.length]);

  const deletePost = async(postId) => {
    let confirm = await window.confirm(
      "êtes-vous sûr de vouloir supprimer ce Post ?"
    );
    if (confirm) {
      await axios.delete("/posts/deletePost/" + postId, {
        withCredentials: true,
      });
    }
    await getMyPosts();
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
