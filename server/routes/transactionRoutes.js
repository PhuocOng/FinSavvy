// Define transaction route

const express = require('express');
const router = express.Router();
const { getMockTransactions } = require('../controllers/transactionController');

router.get('/api/transaction', getMockTransactions);

module.exports = router;
