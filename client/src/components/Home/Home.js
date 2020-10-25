import React, { useEffect, useState } from "react"
import "./home.css"
import { AsideNavLeft, Main, AsideRight, Header, InfosBar, Explorer } from "../index"
import jwt_decode from "jwt-decode";
import axios from "axios"


function Home() {
  const [currentUser, setCurrentUser] = useState({});
  const [decodedId, setDecodedId] = useState('');



// const cookie = document.cookie
// const token = document.cookie.replace('token=', '')

// const decodedToken = jwt_decode(token);
// setDecodedId(decodedToken)
 

useEffect(() => {
  axios
  .get("/user/currentUser", { withCredentials: true })
  .then((response) => {
    const user = {
      id:response.data._id,
      email: response.data.email,
      username: response.data.username,
      avatar: response.data.avatar,
      createtAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    }
    if (response.data) return setCurrentUser(user)
  })
  
  let token;
  const cookie = document.cookie;
  
  if(cookie && cookie.length > 16)  token = document.cookie.replace('token=', '');
  else{
    window.location="/login"
  }
  const decodedToken = jwt_decode(token);
  setDecodedId(decodedToken);
}, [])

return (
  
  
  // ( currentUser.id === decodedId.sub) ? 
  <div className='container'>

  {console.log("token od",decodedId)}
  {console.log("currenuser",currentUser)}
      <div className="header">
        <Header />
      </div>

      <div className="homeInfosBar">
        <InfosBar />
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
  
  // :
  // <Explorer />

)}

export default Home
