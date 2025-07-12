//Routes for Gpt advice
const express = require ('express');
const router = express.Router();
const {getResponses} = require('../controllers/gpt_adviceController');

router.post('/', getResponses);

module.exports=router;