import React, { useEffect, useState } from "react"
import "./infosBar.css"
import axios from "axios"

function InfosBar(props) {
   
  // const [currentUser, setCurrentUser] = useState({});
  const [nbOfUsers, setNbOfUsers] = useState('');
  const [nbOfPosts, setNbOfPosts] = useState('');


  useEffect(() => {
    const users = axios.get("/user", { withCredentials: true })
    const posts = axios.get("/posts", { withCredentials: true })
    axios
    .all([users, posts])
      .then(axios.spread((...response) => {
        const nbOfUsers = response[0].data.length
        const nbOfPosts = response[1].data.length
        setNbOfPosts(nbOfPosts)
        setNbOfUsers(nbOfUsers)
      })
      )
  }, [])

  return (
    <div className='infosBar__container'>
      <div className="infosBar__nbOfUsers InfosBar__content">
        <span> { props.currentUser.postLike.length } </span>
        <p>Posts Likés</p>
      </div>

      <div className="infosBar__nbOfPosts InfosBar__content">
        <span> { nbOfPosts } </span>
        <p>Posts</p>
      </div>
      
    </div>
  )
}

export default InfosBar
