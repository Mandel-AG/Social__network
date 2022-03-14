import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Login } from "../index"
import { Register } from "../index"

import './spline.css';

function Spline() {




  return (
    <div className="container3DLogin">
      {/* <div className='container3D'>
        <iframe src='https://my.spline.design/untitled-07911811b9cd8329c9fede183be4cc36/' frameborder='0' width='100%' height='100%'></iframe>
      </div> */}
      <figure className="spline--image">
        <img src="https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="loginpage" />
      </figure>


      {
        window.location.href === window.location.origin+"/login" ?
        <Login />
        : window.location.href === window.location.origin+"/register" ?
        <Register /> 
        : null
      }
    </div>
  );
}

export default Spline;
