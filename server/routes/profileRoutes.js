const express = require("express");
const userAuth = require("../middleware/auth");
const { 
    getUserProfile, 
    updateProfile, 
    changePassword, 
    updateProfilePicture 
} = require("../controllers/profileController");

const profileRouter = express.Router();

// All routes require authentication
profileRouter.use(userAuth);

// Get user profile
profileRouter.get('/profile', getUserProfile);

// Update profile information
profileRouter.put('/profile', updateProfile);

// Change password
profileRouter.put('/change-password', changePassword);

// Update profile picture
profileRouter.put('/profile-picture', updateProfilePicture);

module.exports = profileRouter;