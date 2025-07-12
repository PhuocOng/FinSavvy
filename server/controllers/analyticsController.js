const Transaction = require('../models/transactionModel');
const { mockTransactions } = require('../data/mockTransactions');


const getCategorySummary = (req, res) => {
  try {
    const userId = req.user ? req.user._id : 'mock-user-id';

    const userTransactions = mockTransactions.filter(
      tx => tx.userId === userId
    );

    const summaryMap = {};

    userTransactions.forEach(tx => {
      if (!summaryMap[tx.category]) {
        summaryMap[tx.category] = 0;
      }
      summaryMap[tx.category] += tx.amount;
    });

    const summary = Object.keys(summaryMap).map(category => ({
      category,
      totalAmount: summaryMap[category],
    }));

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error in getCategorySummary:', error);
    res.status(500).json({ error: 'Failed to calculate category summary' });
  }
};


const getMonthlySummary = (req, res) => {
  try {
    const userId = req.user ? req.user._id : 'mock-user-id';

    const userTransactions = mockTransactions.filter(
      tx => tx.userId === userId
    );

    const summaryMap = {};

    userTransactions.forEach(tx => {
      if (!tx.date) return; // ⛑️ skip if no date

      const dateObj = new Date(tx.date); // parse in case it's a string
      const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;

      if (!summaryMap[monthKey]) {
        summaryMap[monthKey] = 0;
      }
      summaryMap[monthKey] += tx.amount;
    });


    const summary = Object.keys(summaryMap)
      .sort()
      .map(month => ({
        month,
        totalAmount: summaryMap[month],
      }));

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error in getMonthlySummary:', error);
    res.status(500).json({ error: 'Failed to calculate monthly summary' });
  }
};


module.exports = {
  getCategorySummary,
  getMonthlySummary
};
