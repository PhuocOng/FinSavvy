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

module.exports = router;
