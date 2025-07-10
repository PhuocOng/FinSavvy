import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'
 
const Navbar = () => {
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
      <Link to="/login">
        <button className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-white hover:bg-gray-100 transition-all'>
          Login
          <img src={assets.arrow_icon} alt="" />
        </button>
      </Link>
    </div>
  )
}

export default Navbar
