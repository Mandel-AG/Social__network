import React from "react";
import "./asideNavLeft.css";
import axios from "axios";
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";


function AsideNavLeft() {
  let history = useHistory();
  const logOut = () => {
    axios
      .post("/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          history.push("/login");
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
