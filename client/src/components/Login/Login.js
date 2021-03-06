import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import "./login.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function Login() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies([""]);
  let history = useHistory();

  const onSubmit = (data) => {
    axios
      .post(
        '/login',
        { ...data },
        { withCredentials: true }
      )
      .then((req) => {
        if(req.status === 200 && !req.data.error){
          setCookie('token',req.data.token)
          history.push('/home')
        }
        if(req.data.error) setErrorMessage(req.data.error)
      })
  };

  return (
    <div className='containerLogin'>
      <img className="waveLogin" src={require('../utils/wave.svg')} alt='wave' />

      <div className="containerFormLogin">
        <img className="avatarLogin" src='https://www.flaticon.com/svg/static/icons/svg/1077/1077063.svg' alt='avatar' />

        <h1>Login</h1>
        <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            className='loginForm__email'
            name='email'
            type='email'
            ref={register({ required: "Email required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <label>Mot de passe</label>
          <input
            className='loginForm__password'
            type='password'
            name='password'
            ref={register({ required: "Password required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          {errorMessage ? <span className="errorMessage"> {errorMessage} </span> : null}

          <input type='submit' />
        </form>

        <span>
          Pas encore de compte ? Cliquez <Link to='/register'>Ici !</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
