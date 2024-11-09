import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin"; 

const Login = () => {

  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(loginData, 'handleSubmit')
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
      
        <div className="form-group">
          <label> Username </label>
          <input
            className="form-input"
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
   
        <div className="form-group">
          <label> Password </label>
          <input
            className="form-input"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <button className="btn btn-primary" type='submit'> Login </button> or <button className="btn btn-primary" type='button' onClick={handleSignUp}> Sign Up </button>
        </div>
      </form>
    </div>
  )
};

export default Login;
