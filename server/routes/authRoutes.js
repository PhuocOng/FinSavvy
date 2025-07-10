// Express routes: /auth, /gpt, /transactions
const express = require("express");
const { login, register, logout, sendVerifyOtp, verifyEmail, isAuthenticated } = require("../controllers/authController");
const userAuth = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);

module.exports = authRouter;