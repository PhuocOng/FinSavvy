import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 font-sans">
      <header className="flex justify-between items-center text-black py-8 px-10 md:px-32 bg-white drop-shadow-md">
         {/* Logo */}
         <Link to="/" className="font-bold text-xl text-black">
         FinSavvy
         </Link>

        {/* Nav Links */}
        <ul className="hidden xl:flex items-center gap-12 text-black font-semibold text-base">
          <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">Home</Link>

          {userData && (
            <>
              <Link to="/dashboard" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">Dashboard</Link>
              <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">Setting</Link>
            </>
          )}
        </ul>

        {/* Search Bar */}
        <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-[#2563eb] focus:bg-slate-100 focus:outline-[#3b82f6]" />
        </div>

        {/* Profile Avatar*/}
        {userData && (
          <div className="flex justify-center items-center rounded-full bg-black text-white w-10 h-10 cursor-pointer relative group">
            {userData?.name?.[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-10 right-0 z-10 text-black rounded bg-gray-300 shadow-md">
              <ul className="list-none m-0 p-2 text-sm">
                <li onClick={logout} className="py-1 px-2 hover:bg-gray-400 cursor-pointer">Logout</li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
