const Transaction = require("../models/transactionModel.js");

const getCategorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await Transaction.aggregate([
      // 1. Find transactions for the current user
      { $match: { userId: userId, type: 'expense' } },
      // 2. Group them by category and sum up the amounts
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
      // 3. Format the output
      { $project: { _id: 0, category: "$_id", totalAmount: 1 } }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error in getCategorySummary:', error);
    res.status(500).json({ error: 'Failed to calculate category summary' });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await Transaction.aggregate([
      // 1. Find transactions for the current user
      { $match: { userId: userId, type: 'expense' } },
      // 2. Group by month and sum amounts
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, totalAmount: { $sum: "$amount" } } },
      // 3. Sort by month and format the output
      { $sort: { _id: 1 } },
      { $project: { _id: 0, month: "$_id", totalAmount: 1 } }
    ]);

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