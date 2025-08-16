import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { User, LogOut } from 'lucide-react';
import ThemeToggleButton from '../DarkMode/DarkModeButton'; // 1. Import the new button

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileDropdownMenuRef = useRef(null);

  // ... (Your existing useEffect, logout, and handleProfileClick functions remain unchanged)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      const isOutsideAvatar = profileDropdownRef.current && !profileDropdownRef.current.contains(event.target);
      const isOutsideDropdown = profileDropdownMenuRef.current && !profileDropdownMenuRef.current.contains(event.target);
      
      if (showProfileDropdown && isOutsideAvatar && isOutsideDropdown) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

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

  const handleProfileClick = () => {
    if (profileDropdownRef.current) {
      const rect = profileDropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px below the avatar
        right: window.innerWidth - rect.right // Align with right edge of avatar
      });
    }
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    // Add dark mode styles to the outer container
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      {/* Add dark mode styles to the header */}
      <header className="flex justify-between items-center text-black dark:text-gray-200 py-8 px-10 md:px-32 bg-white dark:bg-gray-800 drop-shadow-md relative dark:border-b dark:border-gray-700">
         <Link to="/" className="flex items-center gap-2">
           <img src={assets.logo} alt='FinSavvy logo' className="w-36 h-auto object-contain" /> 
         </Link>

        <ul className="flex items-center gap-12 text-black dark:text-gray-200 font-semibold text-base">
          <li><Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">Home</Link></li>

          {userData && (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="p-3 hover:bg-[#2563eb] hover:text-white font-medium rounded-md transition-all cursor-pointer"
              >
                Dashboard
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow z-50">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setShowDropdown(false)}>Overview</Link>
                  <Link to="/dashboard/expenses" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setShowDropdown(false)}>Expenses</Link>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* 2. Group the right-side items for easy layout */}
        <div className="flex items-center gap-4">
          {/* <div className="relative hidden md:flex items-center justify-center">
            <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
            <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-[#2563eb] focus:bg-slate-100 dark:bg-gray-700 dark:text-white dark:border-blue-500 focus:outline-[#3b82f6]" />
          </div> */}
          <ThemeToggleButton />

          {userData && (
            <div className="relative" ref={profileDropdownRef}>
              {/* Add dark mode styles to the avatar */}
              <div 
                className="flex justify-center items-center rounded-full bg-[#F9E0E5] dark:bg-pink-900/50 w-10 h-10 cursor-pointer hover:bg-[#F0C0C7] dark:hover:bg-pink-800/60 transition-colors"
                onClick={handleProfileClick}
              >
                {userData?.name?.[0].toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Add dark mode styles to the profile dropdown */}
      {userData && showProfileDropdown && (
        <div 
          ref={profileDropdownMenuRef}
          className="fixed w-48 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-[9999]"
          style={{ top: `${dropdownPosition.top}px`, right: `${dropdownPosition.right}px` }}
        >
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 font-medium">
              {userData?.name}
            </div>
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowProfileDropdown(false)}
            >
              <User size={16} className="mr-2" />
              Profile Settings
            </Link>
            <button 
              onClick={() => { logout(); setShowProfileDropdown(false); }}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;