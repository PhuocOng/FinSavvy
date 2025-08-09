import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Get user profile
export const getUserProfile = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/profile/profile`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const { data } = await axios.put(`${backendUrl}/api/profile/profile`, profileData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const { data } = await axios.put(`${backendUrl}/api/profile/change-password`, passwordData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update profile picture
export const updateProfilePicture = async (profilePicture) => {
  try {
    const { data } = await axios.put(`${backendUrl}/api/profile/profile-picture`, { profilePicture }, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
