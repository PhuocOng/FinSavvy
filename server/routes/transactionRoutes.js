// Routes for Transaction Dasboard

const express = require('express');
const fs = require('fs');
const { getTransactions } = require('../controllers/transactionController');

const transactionRoute = express.Router()

transactionRoute.get('/', getTransactions);

module.exports = transactionRoute;
