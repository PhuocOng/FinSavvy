const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

// Get user profile data
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }

        const user = await User.findById(userId).select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt -plaidAccessToken -plaidItemId');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            profile: user
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update user profile information
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, phone, dateOfBirth, address } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Update fields if provided
        if (name !== undefined) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
        if (address !== undefined) user.address = address;

        await user.save();

        // Return updated profile without sensitive data
        const updatedProfile = await User.findById(userId).select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt -plaidAccessToken -plaidItemId');

        res.json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Change user password
const changePassword = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }

        if (!currentPassword || !newPassword) {
            return res.json({ success: false, message: "Current password and new password are required" });
        }

        if (newPassword.length < 6) {
            return res.json({ success: false, message: "New password must be at least 6 characters long" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update profile picture (placeholder for future implementation)
const updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { profilePicture } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        user.profilePicture = profilePicture;
        await user.save();

        res.json({
            success: true,
            message: "Profile picture updated successfully",
            profilePicture: user.profilePicture
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateProfile,
    changePassword,
    updateProfilePicture
};