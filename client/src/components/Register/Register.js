import React, {useState, useEffect} from "react"
import { useForm } from "react-hook-form"
import "./register.css"
import axios from "axios"
import avatarIcon from '../utils/user_register.png'


function Register() {
  const { register, handleSubmit, watch, errors } = useForm()
  const [errorMessage, setErrorMessage] = useState('');
  const [avatar, setAvatar] = useState(false);


  useEffect(()=>{
    watch('file','length').length > 0 ?
      setAvatar(true)
      :
      setAvatar(false)
  },[watch('file','length').length])

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
       }
       if(req.data.error) setErrorMessage(req.data.error)
      })
    }
    
    return (
      
      <div className='containerRegister'>
        <div className="containerFormRegister">

        <h1>Register</h1>
        <span>{errorMessage}</span>

        <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
          <div className='registerForm__avatar'>
            {
              avatar ?
            <figure>
              <img id='registerAvatar' src={avatarIcon} alt="avatar" />
              <figcaption>image uploaded !</figcaption>
            </figure>
                :
                null
            }
            <label htmlFor="file"> Choisissez une image</label>

            <input
              type='file'
              id='file'
              name='file'
              ref={register}
              />
          </div>

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
