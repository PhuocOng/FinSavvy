const openai = require('../config/openai.config');

const getResponses = async (req,res) => {
     const {prompt} = req.body
     
     if (!prompt) {
        return res.status(400).json({error: `Invalid Input`});
     }
     try {//Send request to OpenAI's chat API with the conversation context
         const openai = openai();
         const responses = await openai.chat.completions.create({
         model: 'gpt-4',
         //Provide the full conversation history to the chatGPt so that it is will know what's going on
         messages: [{role: 'system', content: 'You are a helpful financial assistant' },
                    ...prompt]
     }); 
     //Send back GPT response
     res.status(200).json({
        userId: req.user?.id,
      reply: responses.choices[0].message.content.trim()});
     } catch(error)
     {
        res.status(500).json({error: `Internal server error`});
        console.log(`Error in gpt_advice Controller:`,error)
     }
     
 };

 module.exports={getResponses};
