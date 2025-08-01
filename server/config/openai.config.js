require('dotenv').config()
const {OpenAI} = require('openai')
console.log("DEBUG OPENAI KEY:", process.env.OPENAI_API_KEY);
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

module.exports=openai;