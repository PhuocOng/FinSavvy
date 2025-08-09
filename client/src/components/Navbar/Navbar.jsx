import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
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
         <Link to="/" className="flex items-center gap-2">
         <img src={assets.logo} alt='FinSavvy logo' className="w-36 h-auto object-contain" /> 
         </Link>

        <ul className="flex items-center gap-12 text-black font-semibold text-base">
          <li><Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">Home</Link></li>

          {userData && (
            <>
              {/* Dashboard Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="p-3 hover:bg-[#2563eb] hover:text-white font-medium rounded-md transition-all cursor-pointer"
                >
                  Dashboard
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded shadow z-50">
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Overview</Link>
                    <Link to="/dashboard/expenses" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Expenses</Link>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        {/* Search Bar */}
        <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-[#2563eb] focus:bg-slate-100 focus:outline-[#3b82f6]" />
        </div>

        {/* Profile Avatar */}
        {userData && (
          <div className="relative">
            <div 
              className="flex justify-center items-center rounded-full bg-[#F9E0E5] w-10 h-10 cursor-pointer hover:bg-[#F0C0C7] transition-colors"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              {userData?.name?.[0].toUpperCase()}
            </div>
            
            {showProfileDropdown && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                    {userData?.name}
                  </div>
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile Settings
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setShowProfileDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
