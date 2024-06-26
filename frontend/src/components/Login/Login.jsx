import React, { useState, useContext } from 'react';
import './login.css';
import axios from 'axios';
import cross from './cross.png';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Login = ({ setSignup }) => {
  const [login, setLogin] = useState(true);
  const { setToken } = useContext(StoreContext);
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
      const response = await axios.post(`http://localhost:5000/${endpoint}`, formData);

      if (response.data.success) {
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
        <div>
          <img src={cross} className='cross-icon' alt='icon' onClick={() => { setSignup(false); }} />
        </div>
        {!login && <h1>Sign Up</h1>}
        {!login && (<>
          <div className='details'>
            <input required type='text' name='firstname' placeholder='Enter First Name' onChange={handleChange} value={formData.firstname} /></div>
          <div>
            <input required type='text' name='lastname' placeholder='Enter Last Name' onChange={handleChange} value={formData.lastname} />
          </div>
        </>)}
        <div className='phone'>
          {login && <h1>Sign In</h1>}
          <input required type='email' name='email' placeholder='Enter Phone or Email' onChange={handleChange} value={formData.email} />
        </div>
        <div className='password'>
          <input required type='string' name='password' placeholder='Enter Password' onChange={handleChange} value={formData.password} />
        </div>

        {login ? (
          <>
            <div>
              <button className='createbtn'>Sign In</button>
            </div>
            <div>
              {login && <><span className='forgot-password'>Forgot Password?</span><br /></>}
              Don't have an account? <span className='btn' onClick={() => { setLogin(false); }}>Create</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <button className='createbtn'>Create Account</button>
            </div>
            <div>
              Already have an account? <span className='btn' onClick={() => { setLogin(true); }}>Login</span>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
