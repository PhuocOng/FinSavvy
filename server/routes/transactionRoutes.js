<<<<<<< HEAD
// Mock Plaid API for Transaction Dashboard

const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/api/transaction', (req, res)=> {
    const filePath = path.join(__dirname, '../mock/plaid_transaction.json');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading files', err);
            return res.status(500).json({error: 'Some type of error ...'});
        }
        try {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        }
        catch (parseError) {
            console.error('Error pasing JSON: ', parseError);
            res.status(500).json({error: 'Invalid JSON structure'});
        }
    });
});
=======
const express = require('express');
const router = express.Router();
const { getTransactions, createTransaction } = require('../controllers/transactionController');

// 🔒 Optional: mock auth middleware
const mockAuth = (req, res, next) => {
  req.user = { _id: 'mock-user-id' }; // Simulate authenticated user
  next();
};

router.get('/', mockAuth, getTransactions);
router.post('/', mockAuth, createTransaction);
>>>>>>> main

module.exports = router;
