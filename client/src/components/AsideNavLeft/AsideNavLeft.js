import React from "react";
import "./asideNavLeft.css";
import axios from "axios";
import cookie from 'react-cookies'

function AsideNavLeft() {
  const logOut = () => {
    axios
      .post("/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          window.location = "/login";
          // document.cookie = "token" + "=" + "";
          cookie.remove('token')

        }
      });
  };

  return (
    <nav className='containerLeft'>   

      <div className='leftButton'>
        <button className='buttonTweeter leftButton--logout' onClick={logOut}>
          {" "}
          Deconnexion{" "}
        </button>
      </div>
    </nav>
  );
}

export default AsideNavLeft;
