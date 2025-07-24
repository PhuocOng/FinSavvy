// Transaction Controllers

const fs = require('fs');
const path = require('path');
const Transaction = require("../models/transactionModel.js");

const addManualExpense = async(req, res) => {
  try {
    const userId = req.user?.id;
    const { name, amount, category, date } = req.body;

    if (!name || !amount || !category || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newExpense = new Transaction({
      userId, name, amount, category, date,
    })

    await newExpense.save()
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error adding manual expense:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

const getTransactions = (req, res) => {
  const userId = req.user?.id;
  const filePath = path.join(__dirname, '../mock/plaid_transaction.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({error: 'Could not load mock transactions'});
    }

    try {
      const parsedData = JSON.parse(data);
      const rawTransactions = parsedData.transactions;

      const cleanedTransactions = rawTransactions.map(txn => ({
        id: txn.transaction_id, 
        date: txn.date,
        name: txn.name || txn.merchant_name,
        amount: txn.amount,
        category: txn.personal_finance_category?.primary || "Uncategorized",
        userId: userId, 
      }));

      res.json({ transactions: cleanedTransactions });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({error: 'Invalid JSON structure'});
    }
  });
};

module.exports = { getTransactions, addManualExpense };