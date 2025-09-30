import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import { ThemeContext } from "../context/ThemeContext";
import {
  getUserProfile,
  updateProfile,
  changePassword,
} from "../services/profile";
import { User, Lock, Save, Eye, EyeOff, ArrowLeft } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(AppContent);
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      if (response.success) {
        const profile = response.profile;
        setProfileData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          dateOfBirth: profile.dateOfBirth
            ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
            : "",
          address: profile.address || "",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateProfile(profileData);
      if (response.success) {
        toast.success("Profile updated successfully!");
        // Update user data in context
        setUserData((prev) => ({
          ...prev,
          ...profileData,
        }));
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const response = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.success) {
        toast.success("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading && !profileData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`profile-container ${theme || "light"}`}>
      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-title-container">
            <div className="profile-title-icon">
              <User className="profile-title-icon-svg" />
            </div>
            <div className="profile-title-content">
              <h1 className="profile-title">Profile Settings</h1>
              <p className="profile-subtitle">
                Manage your account information and security settings
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <div className="profile-tab-nav">
            <button
              onClick={() => setActiveTab("profile")}
              className={`profile-tab-button ${
                activeTab === "profile" ? "active" : ""
              }`}
            >
              <User className="profile-tab-icon" />
              <span>Profile Information</span>
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`profile-tab-button ${
                activeTab === "password" ? "active" : ""
              }`}
            >
              <Lock className="profile-tab-icon" />
              <span>Change Password</span>
            </button>
          </div>

          <div className="profile-tab-content">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label className="profile-form-label">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="profile-form-input"
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="profile-form-input profile-form-input-disabled"
                    />
                    <p className="profile-form-helper">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="profile-form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label">Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="profile-form-input"
                    />
                  </div>
                </div>

                <div className="profile-form-group profile-form-group-full">
                  <label className="profile-form-label">Address</label>
                  <textarea
                    value={profileData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={3}
                    className="profile-form-textarea"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="profile-form-actions">
                  <button
                    type="submit"
                    disabled={loading}
                    className="profile-form-submit"
                  >
                    <Save className="profile-form-submit-icon" />
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <form
                onSubmit={handlePasswordChange}
                className="profile-password-form"
              >
                <div className="profile-form-group">
                  <label className="profile-form-label">Current Password</label>
                  <div className="profile-password-input-container">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        handlePasswordInputChange(
                          "currentPassword",
                          e.target.value
                        )
                      }
                      className="profile-form-input profile-password-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="profile-password-toggle"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="profile-password-icon" />
                      ) : (
                        <Eye className="profile-password-icon" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">New Password</label>
                  <div className="profile-password-input-container">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        handlePasswordInputChange("newPassword", e.target.value)
                      }
                      className="profile-form-input profile-password-input"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="profile-password-toggle"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="profile-password-icon" />
                      ) : (
                        <Eye className="profile-password-icon" />
                      )}
                    </button>
                  </div>
                  <p className="profile-form-helper">Minimum 6 characters</p>
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">
                    Confirm New Password
                  </label>
                  <div className="profile-password-input-container">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        handlePasswordInputChange(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      className="profile-form-input profile-password-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="profile-password-toggle"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="profile-password-icon" />
                      ) : (
                        <Eye className="profile-password-icon" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="profile-form-actions">
                  <button
                    type="submit"
                    disabled={loading}
                    className="profile-form-submit"
                  >
                    <Lock className="profile-form-submit-icon" />
                    <span>
                      {loading ? "Changing Password..." : "Change Password"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
