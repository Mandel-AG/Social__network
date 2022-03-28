import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { Login } from "../index"
import { Register } from "../index"

import './spline.css';

function Spline() {

  const [component, setComponent] = useState()

useEffect(() => {
  if(window.location.pathname === '/login'){
    setComponent('Login')
  } else if (window.location.pathname === '/register'){
    setComponent('Register')
  }
  return
},[window.location.pathname])

const loginContainer = useRef(null);
const registerContainer = useRef(null);
const container = useRef(null);


return (
  <div className="container3DLogin">
      <figure className="spline--image">
        <img src="https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="loginpage" />
      </figure>
      <div className="spline__login_register" ref={container}>
      {
        component === "Login" ?
        <div className="spline__login_register" ref={loginContainer}>
          <span className="spline__span-login_register" >
            Pas encore de compte ? Cliquez <Link to='/register'>Ici !</Link>
          </span>
          <Login />
        </div>
        :
        <div className="spline__login_register" ref={registerContainer}>
          <span className="spline__span-login_register">Déjà un compte ? Cliquez <Link to='/login'> ici !</Link></span>
          <Register /> 
        </div>
      
      }

      </div>
    </div>
  );
}

export default Spline;
