const Transaction = require('../models/transactionModel');


const getCategorySummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { userId: req.user._id } }, // Filter by logged-in user
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalAmount: 1
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error('Error in category summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          totalAmount: 1
        }
      },
      { $sort: { month: 1 } }
    ]);

    res.json(summary);
  } catch (error) {
    console.error('Error in monthly summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCategorySummary,
  getMonthlySummary
};