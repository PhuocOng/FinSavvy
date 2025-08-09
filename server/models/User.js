// Mongoose schemas
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    dateOfBirth: { type: Date, default: null },
    address: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: String, default: 0},
    isAccountVerified: { type: Boolean, default: false},
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
    plaidAccessToken: { type: String, required: false},
    plaidItemId: { type: String, required: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const User =  mongoose.model.User || mongoose.model('User', userSchema);

module.exports = User;