const {OpenAI, Configuration} = require('openai')
require('dotenv').config()

const configuration = new Configuration({apiKey: process.env.OPEN_AI_KEY});
const openai = new OpenAI(configuration);

module.exports=openai
