// Mongoose schemas
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        //required: true
        required: function () { return !this.isGuest; },
        trim: true
    },
    email: { 
        type: String, 
        required: function () { return !this.isGuest; }, 
        //unique: true,
        //sparse: true,
        trim: true
    },
    password: { 
        type: String, 
        required: function () { return !this.isGuest; }
    },
    isGuest: { type: Boolean, default: false },
    guestExpiresAt: { type: Date },
    // Persist guest per device
    guestKeyHash: { type: String, unique: true, sparse: true, index: true },
    guestLastSeen: { type: Date, default: null },

    phone: { type: String, default: '' },
    dateOfBirth: { type: Date, default: null },
    address: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    verifyOtp: { type: Number, default: 0 },
    verifyOtpExpireAt: { type: Number, default: 0},
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

userSchema.index(
    { email: 1 },
    { name: "uniq_email_if_string", unique: true, partialFilterExpression: { email: { $type: "string" } } }
);

const User =  mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;