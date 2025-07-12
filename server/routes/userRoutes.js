// Routes for authenticated user data access

const express = require("express");
const userAuth = require("../middleware/auth");
const getUserData = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData)

module.exports = userRouter;