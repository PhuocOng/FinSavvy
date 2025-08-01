// Routes for Transaction Dasboard

const express = require('express');
const fs = require('fs');
const userAuth = require('../middleware/auth')
const { getTransactions, addManualExpense, deleteTransaction } = require('../controllers/transactionController');

const transactionRoute = express.Router()

transactionRoute.get('/', userAuth, getTransactions);
transactionRoute.post('/manual-expenses', userAuth, addManualExpense);
transactionRoute.delete('/:id', userAuth, deleteTransaction);

module.exports = transactionRoute;
