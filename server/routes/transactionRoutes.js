// Routes for Transaction Dasboard

const express = require('express');
const fs = require('fs');
const userAuth = require('../middleware/auth')
const { getTransactions, addManualExpense } = require('../controllers/transactionController');

const transactionRoute = express.Router()

transactionRoute.get('/', userAuth, getTransactions);
transactionRoute.post('/manual-expenses', userAuth, addManualExpense);

module.exports = transactionRoute;
