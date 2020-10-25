import React from "react";
import Profil from "../Profil/Profil";
import "./header.css";



function Header() {

  return (
    <div className="headerContainer">
      <div className="headerProfil">
        <Profil />
      </div>

      <div className="headerPictures">
      </div>

    </div>
  );
}

export default Header;
