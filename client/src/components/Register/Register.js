import React, {useState} from "react"
import { useForm } from "react-hook-form"
import "./register.css"
import { useHistory } from "react-router-dom";
import axios from "axios"


function Register() {
  const { register, handleSubmit, watch, errors } = useForm()
  const [errorMessage, setErrorMessage] = useState('');
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
       }
       if(req.data.error) setErrorMessage(req.data.error)
      })
    }
    
    return (
      
      <div className='containerRegister'>
        <div className="containerFormRegister">
        <img className="avatarLogin" src='https://cdn-icons.flaticon.com/png/512/666/premium/666201.png?token=exp=1647226108~hmac=dded4b8f08b855af7a6820bb68d4bb8c' alt='avatar' />


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
        </div>
    </div>
  )
}

export default Register
