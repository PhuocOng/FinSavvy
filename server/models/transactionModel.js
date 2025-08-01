const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // ADDED: To store the unique ID from Plaid and prevent duplicates
  transactionId: {
    type: String,
    unique: true, // Ensures no two transactions have the same Plaid ID
    sparse: true, // Allows multiple documents to have a null value for this field
  },
  // ADDED: For the transaction or merchant name
  name: {
    type: String,
    required: true,
  },
  name: { 
    type: String, 
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // CHANGED: Removed the enum for flexibility with Plaid's categories
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // ADDED: To easily distinguish between income and expenses
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
}, {
  timestamps: true, // Keeps createdAt and updatedAt
});

module.exports = mongoose.model('Transaction', TransactionSchema);