import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./profil.css";
import changePictureIcon from '../utils/change_profile_picture.png'

import { useForm } from "react-hook-form";
import axios from "axios";

function Profil() {
  const [currentUser, setCurrentUser] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();
  let history = useHistory();

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
      .then((res) => (res.status === 200 ? (history.push("/home")) : null))
  };



  let background = {
    backgroundImage : `url("/api/avatar/${currentUser.avatar}")`
  }
  
  

  return (
    <div className='containerProfil' style={background}>
    
      {/* <div className='profil__avatar'>
      </div> */}

      <div className='profil__infos'>

        <span className="infos__email"> {currentUser.email} </span>{" "}
        <span className="infos__pseudo" > {currentUser.username} </span>{" "}
        <span className="infos__date" > Crée le  {currentUser.createdAt} </span>{" "}

        <div className='profil__form'>
          <form className="form__avatar" onSubmit={handleSubmit(changeAvatar)}>
            <label className="profil__label" htmlFor="file_input">
              <img alt="change profile picture" src={changePictureIcon} />
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
