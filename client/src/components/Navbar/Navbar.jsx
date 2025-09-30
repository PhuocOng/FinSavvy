import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { User, LogOut } from "lucide-react";
import ThemeToggleButton from "../DarkMode/DarkModeButton"; // 1. Import the new button
import "./Navbar.css";

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
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

      const isOutsideAvatar =
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target);
      const isOutsideDropdown =
        profileDropdownMenuRef.current &&
        !profileDropdownMenuRef.current.contains(event.target);

      if (showProfileDropdown && isOutsideAvatar && isOutsideDropdown) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
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
        right: window.innerWidth - rect.right, // Align with right edge of avatar
      });
    }
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="navbar-container">
      <header className="navbar-header">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="FinSavvy logo"
            className="w-36 h-auto object-contain"
          />
        </Link>

        <ul className="navbar-nav-links">
          <li>
            <Link to="/" className="navbar-nav-link">
              Home
            </Link>
          </li>

          {userData && (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="navbar-nav-link"
              >
                Dashboard
              </button>
              {showDropdown && (
                <div className="navbar-dropdown">
                  <Link
                    to="/dashboard"
                    className="navbar-dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Overview
                  </Link>
                  <Link
                    to="/dashboard/expenses"
                    className="navbar-dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Expenses
                  </Link>
                </div>
              )}
            </li>
          )}
        </ul>

        <div className="navbar-right-section">
          <ThemeToggleButton />

          {userData && (
            <div className="relative" ref={profileDropdownRef}>
              <div className="navbar-avatar" onClick={handleProfileClick}>
                {userData?.name?.[0].toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>

      {userData && showProfileDropdown && (
        <div
          ref={profileDropdownMenuRef}
          className="navbar-profile-dropdown"
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
          <div className="py-2">
            <div className="navbar-profile-dropdown-header">
              {userData?.name}
            </div>
            <Link
              to="/profile"
              className="navbar-profile-dropdown-item"
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
              className="navbar-profile-dropdown-item"
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
