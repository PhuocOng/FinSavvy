//Routes for Gpt advice
const express = require ('express');
const userAuth = require('../middleware/auth')
const router = express.Router();
const {getResponses} = require('../controllers/gpt_adviceController');

router.post('/', userAuth, getResponses);

module.exports=router;