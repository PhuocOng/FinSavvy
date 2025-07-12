// 🧠 Fake database stored in memory
const { mockTransactions } = require('../data/mockTransactions');


// GET all transactions
const getTransactions = (req, res) => {
  res.status(200).json(mockTransactions);
};

// POST new transaction
const createTransaction = (req, res) => {
  const { title, amount, category } = req.body;

  const newTransaction = {
    id: mockTransactions.length + 1,
    title,
    amount,
    category,
    userId: req.user ? req.user._id : 'mock-user-id',
    createdAt: new Date(),
    date: new Date(), 
  };

  mockTransactions.push(newTransaction);
  res.status(201).json(newTransaction);
};

module.exports = {
  getTransactions,
  createTransaction,
};
