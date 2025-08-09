import React, { useContext, useState, useEffect, useRef } from 'react';
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileDropdownMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      // Check if click is outside both the avatar and the dropdown menu
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
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 font-sans">
      <header className="flex justify-between items-center text-black py-8 px-10 md:px-32 bg-white drop-shadow-md relative">
         {/* Logo */}
         <Link to="/" className="flex items-center gap-2">
         <img src={assets.logo} alt='FinSavvy logo' className="w-36 h-auto object-contain" /> 
         </Link>

        <ul className="flex items-center gap-12 text-black font-semibold text-base">
          <li><Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">Home</Link></li>

          {userData && (
            <>
              {/* Dashboard Dropdown */}
              <li className="relative" ref={dropdownRef}>
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
          <div className="relative" ref={profileDropdownRef}>
            <div 
              className="flex justify-center items-center rounded-full bg-[#F9E0E5] w-10 h-10 cursor-pointer hover:bg-[#F0C0C7] transition-colors"
              onClick={handleProfileClick}
            >
              {userData?.name?.[0].toUpperCase()}
            </div>
          </div>
        )}
      </header>

      {/* Profile Dropdown - Fixed positioned to appear in front of everything */}
      {userData && showProfileDropdown && (
        <div 
          ref={profileDropdownMenuRef}
          className="fixed w-48 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`
          }}
        >
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 font-medium">
              {userData?.name}
            </div>
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
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
