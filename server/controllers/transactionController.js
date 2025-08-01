const Transaction = require("../models/transactionModel.js");

// Get all transactions for the logged-in user from the database
const getTransactions = async (req, res) => {
  try {
    // req.user.id comes from your authentication middleware
    const userId = req.user.id;

    // Find all transactions in the database that match the user's ID
    const userTransactions = await Transaction.find({ userId: userId }).sort({ date: -1 });

    res.status(200).json({ transactions: userTransactions });
  } catch (err) {
    console.error('Error fetching transactions from DB:', err);
    res.status(500).json({ error: 'Could not load transactions' });
  }
};

module.exports = { getTransactions };