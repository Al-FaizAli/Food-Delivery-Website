import React, { useState, useContext } from 'react';
import './login.css';
import axios from 'axios';
import cross from './cross.png';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { RiAdminFill } from "react-icons/ri";

const Login = ({ setSignup }) => {
  const [login, setLogin] = useState(true);
  const [adminLogin, setAdminLogin] = useState(false);
  const { setToken, url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = login ? 'login' : 'signup';
    try {
      const response = await axios.post(`${url}/${endpoint}`, formData);

      if (response.data.admin) {
        toast.success(response.data.message);
        setSignup(false);
        window.location.href = 'https://food-delivery-website-admin-tr5c.onrender.com';
      } else if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setSignup(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className='main'>
      <form className='form' onSubmit={handleSubmit}>
        <RiAdminFill className='admin-icon' onClick={() => setAdminLogin(!adminLogin)} />
        <img src={cross} className='cross-icon' alt='icon' onClick={() => { setSignup(false); }} />
        {adminLogin ? (
          <>
            <h1>Admin Login</h1>
            <div className='phone'>
              <input required type='email' name='email' placeholder='Enter Email' onChange={handleChange} value={formData.email} />
            </div>
            <div className='password'>
              <input required type='password' name='password' placeholder='Enter Password' onChange={handleChange} value={formData.password} />
            </div>
            <div>
              <button className='createbtn'>Log In</button>
            </div>
          </>
        ) : (
          <>
            {login ? <h1>Sign In</h1> : <h1>Sign Up</h1>}
            {!login && (
              <>
                <div className='details'>
                  <input required type='text' name='firstname' placeholder='Enter First Name' onChange={handleChange} value={formData.firstname} />
                </div>
                <div>
                  <input required type='text' name='lastname' placeholder='Enter Last Name' onChange={handleChange} value={formData.lastname} />
                </div>
              </>
            )}
            <div className='phone'>
              <input required type='email' name='email' placeholder='Enter Email' onChange={handleChange} value={formData.email} />
            </div>
            <div className='password'>
              <input required type='password' name='password' placeholder='Enter Password' onChange={handleChange} value={formData.password} />
            </div>
            {login ? (
              <>
                <div>
                  <button className='createbtn'>Sign In</button>
                </div>
                <div>
                  <span className='forgot-password'>Forgot Password?</span><br />
                  Don't have an account? <span className='btn' onClick={() => setLogin(false)}>Create</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button className='createbtn'>Create Account</button>
                </div>
                <div>
                  Already have an account? <span className='btn' onClick={() => setLogin(true)}>Login</span>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
