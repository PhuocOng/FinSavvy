import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
 
const Navbar = () => {
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent)
  const navigate = useNavigate();
  
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if(data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full flex justify-between items-center px-6 py- sm:px-24 shadow-md fixed top-0 left-0 z-50'>
      <Link to="/">
        <img src={assets.react} alt="logo" className='w-24 sm:w-32' />
      </Link>

      {/* Navigation link */}
      <div className='hidden sm:flex gap-6 font-medium'>
        <Link to="/greetings" className=" hover:text-blue-600 transition">Greeting</Link>
      </div>

    {/* Login button */}
      {userData ? ( // justify-center and items-center only work when having flex container
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black relative group'>
          {userData.name[0].toUpperCase()}
          
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            
            <ul className='list-none m-0 p-2 bg-gray-300 text-sm'>

              {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-400 cursor-pointer'>Verify email</li>}
              
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-400 cursor-pointer pr-10'>Logout</li>
            </ul>

          </div>
        </div>
      ) 
      : 
      (  
        <Link to="/login">
          <button className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-white hover:bg-gray-100 transition-all'>
            Login
            <img src={assets.arrow_icon} alt="" />
          </button>
        </Link>
      )}
      
    </div>
  )
}

export default Navbar
