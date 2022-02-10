import React, {useState} from "react"
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie";
import "./register.css"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import axios from "axios"
import {Home} from '../index';


function Register() {
  const { register, handleSubmit, watch, errors } = useForm()
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies([""]);
  let history = useHistory();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("username", data.username);
  
    axios
      .post(
        "/register",
        formData,
        { withCredentials: true }
      )
      .then((req) => {
       if(req.status === 200 && !req.data.error){
         history.push('/home')
         setCookie('token',req.data.token)
         
       }
       if(req.data.error) setErrorMessage(req.data.error)
      })
    }
    
    return (
      
      <div className='containerRegister'>
        <img className="waveRegister" src={require('../utils/wave.svg')} alt='wave' />
        <div className="containerFormRegister">
        <img className="avatarLogin" src='https://www.flaticon.com/svg/static/icons/svg/1077/1077063.svg' alt='avatar' />


        <h1>Register</h1>
    
        <span>{errorMessage}</span>

        <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
          <label>Avatar</label>
          <input
            className='registerForm__avatar'
            type='file'
            id='file'
            name='file'
            ref={register}
          />

          <label>username</label>
          <input
            className='registerForm__email'
            name='username'
            maxLength='12'
            ref={register({ required: "username required" })}
          />

          <label>Email</label>
          <input
            className='registerForm__email'
            name='email'
            type='email'
            ref={register({ required: "Email required" })}
          />

          <label>Mot de passe</label>
          <input
            className='registerForm__password'
            type='password'
            name='password'
            ref={register({ required: "Password required" })}
          />

          <input type='submit' />
        </form>

        <span>Deja un compte ? Cliquez <Link to='/login'> ici !</Link></span>
        </div>
    </div>
  )
}

export default Register
