const Transaction = require('../models/transactionModel'); // get data from DB

// Category summary
const getCategorySummary = async (req, res) => {
  const userId = req.user.id; // (mock for now)
  const summary = await Transaction.aggregate([
    { $match: { userId } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } }
  ]);

  res.json(summary);
};

// Monthly summary
const getMonthlySummary = async (req, res) => {
  const userId = req.user.id;
  const summary = await Transaction.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: { $substr: ['$date', 0, 7] }, // e.g., "2025-07"
        total: { $sum: '$amount' }
      }
    }
  ]);

  res.json(summary);
};

module.exports = {
  getCategorySummary,
  getMonthlySummary,
};
