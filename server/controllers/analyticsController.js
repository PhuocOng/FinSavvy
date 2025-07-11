const Transaction = require('../models/transactionModel');

const getCategorySummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id 
        }
      },
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

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate category summary' });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$date" }
          },
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          totalAmount: 1
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate monthly summary' });
  }
};

module.exports = {
  getCategorySummary,
  getMonthlySummary
};
