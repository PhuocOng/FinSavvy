// Logic for each route (auth, gpt, transactions)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const transporter = require("../config/nodemailer.js");
const { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } = require("../config/emailTemplate.js");

const register = async(req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.json({success: false, message: 'Missing Details'})
    }

    try {
        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.json({ success: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword})

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Sending welcome email
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const verifyEmailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", email)
        };
        await transporter.sendMail(verifyEmailOption);

        const welcomeMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to FinSavvy',
            text: `Welcome to FinSavvy. Your account has just been created with email id: ${email}`
        };

        await transporter.sendMail(welcomeMailOptions);
       
        return res.json({
            success: true,
            message: "User registered successfully! OTP sent to email.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({success: false, message: 'Email and password are required'})
    }

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.json({ success: false, message: "Invalid email"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({ success: false, message: "Invalid password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

           return res.json({
            success: true,
            token,
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
      },
    });
       
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({success: true, message: 'Logged Out'})
       
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// Send verification OTP to user's email
const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId)

        if(user.isAccountVerified) {
            return res.json({success: false, message: 'Account already verified'})
        }
        // OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        // Sending welcome email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`, html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }

        await transporter.sendMail(mailOption)

        return res.json({ success: true, message: "OTP sent to email successfully" });

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const verifyEmail = async (req, res) => {
    const {otp} = req.body;
    const userId = req.user?.id

    if (!userId || !otp) {
        return res.json({success: false, message: 'Missing details'})
    }

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.json({success: false, message: 'User not found'})
        }

        if(user.verifyOtp === '' || user.verifyOtp != otp) {
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if(user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP Expired'});
        }    
       
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message: 'Email verified successfully'})
       
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const isAuthenticated = async (req, res) => {
    try {
        // guest
        if (req.user.userType === "guest"){
            return res.json({
                success: true,
                user: {
                    name: "Guest",
                    isGuest: true
                }
            })
        }

        // real user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                isGuest: false
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Send password reset OTP
const sendResetOtp = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.json({success: false, message: "Email is required"})
    }

    try {

        const user = await User.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        // OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        // Sending welcome email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting password is ${otp}. Use this OTP to proceed with resetting your password.`, html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{password}}", user.password)
        }

        await transporter.sendMail(mailOption)

        return res.json({success: true, message: "OTP sent to your email"})
       
    } catch (error) {
        return res.json({success: false, message: "Email is required"})
    }
}

// Reset User Pssword
const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword) {
        return res.json({success: false, message: "Email, OTP, and new password are required"})
    }

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        if(user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "OTP Expired"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save()
        return res.json({success: true, message: "Password has been reset successfully"});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const guestLogin = async (req, res) => {
    try {
        const guestPayload = {
            userType: "guest",
            createdAt: new Date()
        }

        const token = jwt.sign(guestPayload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        return res.json({
            success: true,
            message: "Guest login successful",
            token,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

module.exports = {register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, guestLogin};