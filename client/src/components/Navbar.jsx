import React, { useContext, useState } from 'react'
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="w-full bg-gradient-to-r from-[#FEFBC7] to-[#5EABD6]">
      <header className="flex justify-between items-center text-black py-8 px-10 md:px-32 bg-white drop-shadow-md">
        <a href="#" className="">
        </a>


       <ul className="hidden xl:flex items-center gap-12 text-black font-semibold text-base">
          <Link to="/" className="p-3 hover:bg-[#5EABD6] hover:text-white rounded-md transition-all cursor-pointer">Home</Link>
          <Link to="/dashboard" className="p-3 hover:bg-[#5EABD6] hover:text-white rounded-md transition-all cursor-pointer">Dashboard</Link>
          <Link to="/explore" className="p-3 hover:bg-[#5EABD6] hover:text-white rounded-md transition-all cursor-pointer">Explore</Link>
          <Link to="/contact" className="p-3 hover:bg-[#5EABD6] hover:text-white rounded-md transition-all cursor-pointer">Contact</Link>
       </ul>

       <div className="relative hidden md:flex items-center justify-center gap-3">
        <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
        <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-[#5EABD6] focus:bg-salate-100 focus:outline-[#FEFBC7]" />
       </div>

       
    {/* Login button */}
      {userData ? ( // justify-center and items-center only work when having flex container
        <div className=' flex justify-center items-center rounded-full bg-black relative group'>
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
      <i 
      className={`xl:hidden block text-5xl cursor-pointer ${isMenuOpen ? "bx bx-x" : "bx bx-menu"}`}
      onClick={() => setIsMenuOpen(!isMenuOpen)}>
      </i>
      <div 
      className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-all duration-300 ease-in-out 
      ${isMenuOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all">
        Home
        </Link>
        
        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all">
        Dashboard
        </Link>

        <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all"> 
        Explore
        </Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all">
        Contact
        </Link>
      </div>

      </header>
    </div>
  )
}
export default Navbar;
