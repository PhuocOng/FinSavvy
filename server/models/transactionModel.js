const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  category: String,
  date: String, // e.g. "2025-07-10"
});

module.exports = mongoose.model('Transaction', transactionSchema);
