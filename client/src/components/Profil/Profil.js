import React, { useEffect, useState } from "react";
import "./profil.css";

import { useForm } from "react-hook-form";
import axios from "axios";

function Profil() {
  const [currentUser, setCurrentUser] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    axios
      .get("/user/currentUser", { withCredentials: true })
      .then((response) => {
        const user = {
          id: response.data._id,
          email: response.data.email,
          username: response.data.username,
          avatar: response.data.avatar,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        };
        if (response.data) return setCurrentUser(user);
      })
  },[]);

  const changeAvatar = (data) => {
    const formData = new FormData();
  formData.append("file", data.file[0]);

  
      axios.post(`/user/updateUser/${currentUser.id}`, formData, {
        withCredentials: true,
      })
      .then((res) => (res.status === 200 ? (window.location = "/home") : null))
  };



  let background = {
    backgroundImage : "url("+currentUser.avatar+")"
  }
  

  return (
    <div className='containerProfil' style={background}>
    
      <div className='profil__avatar'>
        <img alt='profile picture' src={currentUser.avatar ? (`/api/avatar/${currentUser.avatar}`) : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
      </div>

      <div className='profil__infos'>

        <span className="infos__email"> {currentUser.email} </span>{" "}
        <span className="infos__pseudo" > {currentUser.username} </span>{" "}
        <span className="infos__date" > Crée le  {currentUser.createdAt} </span>{" "}

        <div className='profil__form'>
          <form className="form__avatar" onSubmit={handleSubmit(changeAvatar)}>
            <label className="profil__label" for="file_input">
              <img alt="change profile picture" src='https://www.flaticon.com/svg/static/icons/svg/1837/1837635.svg' />
            </label>
            <input
              className='registerForm__avatar'
              type='file'
              name='file'
              id="file_input"
              ref={register}
              onChange={handleSubmit(changeAvatar)}
            />      
      
            <input type="submit" />
          </form>  
        </div>

      </div>      
    </div>
  );
}

export default Profil;
