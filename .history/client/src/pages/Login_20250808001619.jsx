import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);


  axios.defaults.withCredentials = true;


  const onSubmitHandler = async (e) => {
    e.preventDefault();


    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });


        if (data.success) {
          navigate('/email-verify');
        } else {
          toast.error(data.message);
        }


      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });


        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          if (!data.user.isAccountVerified) {
            // Send OTP only if user is not verified
            navigate('/email-verify');
          } else {
            navigate('/');
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-[#d0ebff] p-10 rounded-lg shadow-lg w-full sm:w-96 text-sm">
        <h2 className="text-3xl font-semibold text-center mb-3">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
        </p>


        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white">
              <img src={assets.person_icon} alt="person" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none w-full text-black"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}


          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white">
            <img src={assets.mail_icon} alt="email" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full text-white"
              type="email"
              placeholder="Email"
              required
            />
          </div>


          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white">
            <img src={assets.lock_icon} alt="lock" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none w-full text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>


          {state === 'Login' && (
            <p onClick={() => navigate('/reset-password')} className="mb-4 cursor-pointer text-blue-500 hover:underline">
              Forgot password?
            </p>
          )}


          <button
            type="submit"
            className="w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold hover:opacity-90 transition"
          >
            {state}
          </button>
        </form>


        <p className="text-gray-500 text-center text-xs mt-4">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className="text-blue-500 cursor-pointer underline">
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')} className="text-blue-500 cursor-pointer underline">
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};


export default Login;