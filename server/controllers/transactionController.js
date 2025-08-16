const Transaction = require("../models/transactionModel.js");

const addManualExpense = async(req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "NO_AUTH" }); 
    }
    const { name, amount, category, date} = req.body;

    if (!name || !amount || !category || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newExpense = new Transaction({
      userId, name, amount, category, date, type: 'expense',
    })

    await newExpense.save()
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error adding manual expense:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

const getTransactions = async (req, res) => {
  try {
    const userId = req.user?.id;
    const transactions = await Transaction.find({ userId });

    res.json({ transactions });
  } catch (err) {
    console.error('Error fetching transactions from DB:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user?.id;
    const transactionId = req.params.id;

    const deleted = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId: userId, // ensure users can only delete their own
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTransactions, addManualExpense, deleteTransaction };