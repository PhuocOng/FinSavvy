const express = require ('express');
const openai = require ('../config/openai.config')

const getResponses = async (req,res) => {
     const {prompt} = req.body
     
     if (!prompt) {
        return res.status(400).json({error: `Invalid Input`});
     }
     try {
         const responses = await openai.chat.completions.create({
         model: 'gpt-4',
         messages: [{role: 'system', content: 'You are a helpful financial assistant' },
                    ...prompt]
     }); 
     res.status(200).json({reply: responses.choices[0].message.content.trim()});
     } catch(error)
     {
        res.status(500).json({error: `Internal server error`});
        console.log(`Error in gpt_advice Controller:`,error)
     }
     
 };

 module.exports={getResponses};
