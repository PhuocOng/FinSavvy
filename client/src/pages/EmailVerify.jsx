import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl, setIsLoggedin, userData, getUserData, isLoggedin} = useContext(AppContent)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // move to next...(right)
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key ==='Backspace' && e.target.value === '' & index > 0) {
      inputRefs.current[index - 1].focus(); // move to next...(left)
    }
  }

  // copy paste otp
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')

    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async(e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', { otp})

      if(data.success) {
        toast.success(data.message)
        setIsLoggedin(true);
        await getUserData();
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(data.message)
    }
  } 

  // if verified -> (cannot come to verify page)
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/') // if true
  }, [isLoggedin, userData])
  
  // IMPORTANT!!!!
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100'>
      <form onSubmit={onSubmitHandler} className='bg-[#d0ebff] p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email</p>
        
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((dummy, index) => ( // dummy is 0, index is position
            <input 
              type="text" maxLength='1' key={index} required 
              className='w-12 h-12 text-center text-xl rounded-md bg-white'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] rounded-full'>Verify email</button>
      </form>
      
    </div>
  );
};

export default EmailVerify;
