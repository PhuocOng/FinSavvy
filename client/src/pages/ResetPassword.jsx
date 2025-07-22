import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const inputRefs = React.useRef([])

  const [newPassword, setNewPassword] = useState('')  
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  // automatically move focus to the next input field (right).
  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // move to next...(right)
    }
  }

  // press Backspace: automatically move focus back to the previous
  const handleKeyDown = (e, index) => {
    if(e.key ==='Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus(); // move to next...(left)
    }
  }

  // copy paste otp
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')  // Get pasted text ('123')
    const pasteArray = paste.split('') // ['1','2','3']

    pasteArray.forEach((char, index) => {
      // Set each input box to the charr
      if(inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      data.success && setIsEmailSent(true)

    } catch (error) {
      toast.error(error.message)
    }
  }

  const OnSubmitOtp = async(e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitPassword = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      data.success && navigate('/login')

    } catch (error) {
      toast.error(data.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100'>

      {/* Enter email */}
      {!isEmailSent && 

      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-lg font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
          <input type='email' placeholder='Email' className='outline-none bg-transparent w-full' value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full'>Submit</button>
      </form>

      }

      {/* otp input form */}
      {!isOtpSubmitted && isEmailSent && 
      <form onSubmit={OnSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input 
              type="text" maxLength='1' key={index} required 
              className='w-12 h-12 text-center text-xl rounded-md bg-[#333A5C]'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full'>Submit</button>
      </form>
      }


      {/* Enter new password */}
      {isOtpSubmitted && isEmailSent && 
      <form onSubmit={onSubmitPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>New password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.lock_icon} alt="" className='w-3 h-3'/>
          <input type='password' placeholder='New password' className='outline-none bg-transparent w-full' value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full'>Submit</button>
      </form>
      }

    </div>
  );
};

export default ResetPassword;
