// Routes for Transaction Dasboard

const express = require('express');
const fs = require('fs');
const userAuth = require('../middleware/auth')
const { getTransactions } = require('../controllers/transactionController');

const transactionRoute = express.Router()

transactionRoute.get('/', userAuth, getTransactions);

module.exports = transactionRoute;
