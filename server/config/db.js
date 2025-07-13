 // MongoDB connection, Plaid setup, etc-\
 const app=require('../app')
 const mongoose = require('mongoose')
 
 require('dotenv').config();

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected mongoDB`)
    } catch (error) {
        console.log(`Mongo connection error`, error);
    }
 };

 module.exports= connectDB;

