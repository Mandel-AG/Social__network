import React, { useEffect, useState } from "react"
import "./home.css"
import { AsideNavLeft, Main, AsideRight, Header, InfosBar, Loading } from "../index"
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Home() {
  const [currentUser, setCurrentUser] = useState({});
  const [decodedId, setDecodedId] = useState('');
  let history = useHistory();


useEffect(() => {
  axios
  .get("/user/currentUser", { withCredentials: true })
  .then((response) => {
    const user = {
      id:response.data._id,
      email: response.data.email,
      username: response.data.username,
      avatar: response.data.avatar,
      postLike: response.data.postLike,
      createtAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    }
    if (response.data) return setCurrentUser(user)
  },[])
  
  let token;
  const cookie = document.cookie;
  
  if(cookie && cookie.length > 16)  token = document.cookie.replace('token=', '');
  else{
    history.push("/login")
  }
  const decodedToken = jwt_decode(token);
  setDecodedId(decodedToken);
}, [])

return (
  
  ( currentUser.id === decodedId.sub) ? 
  <div className='container'>
      <div className="header">
        <Header />
      </div>

      <div className="homeInfosBar">
        <InfosBar currentUser={currentUser} />
      </div>
      
      <div className='containerAsideLeft'>
        <AsideNavLeft />
      </div>

      <div className='containerMainCenter'>
        <Main currentUser={currentUser} />
      </div>

      <div className='containerAsideRight'>
        <AsideRight currentUser={currentUser} />
      </div>
    </div>
  
  :
  <div>
    <Loading />
  </div>
  )}

export default Home
