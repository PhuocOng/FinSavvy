// Controller to handle fetching authenticated user data
const User = require("../models/User.js");

const getUserData = async (req, res) => {
    try {
        const userId = req.user?.id;

        const user = await User.findById(userId).select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt -plaidAccessToken -plaidItemId');

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }
        res.json({
            success: true, 
            userData: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                address: user.address,
                profilePicture: user.profilePicture,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

module.exports = getUserData;