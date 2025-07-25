require('dotenv').config()
const {OpenAI} = require('openai')

function openai() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

module.exports=openai;
