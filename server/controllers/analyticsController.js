const fs = require('fs');
const path = require('path');

const getPlaidTransactions = () => {
  const filePath = path.join(__dirname, '../mock/plaid_transaction.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  return data.transactions; // Return only the transactions array
};

const getCategorySummary = (req, res) => {
  try {
    const transactions = getPlaidTransactions();

    const summaryMap = {};

    transactions.forEach(tx => {
      const category = tx.personal_finance_category?.primary || "Uncategorized";

      if (!summaryMap[category]) {
        summaryMap[category] = 0;
      }
      summaryMap[category] += tx.amount;
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

    const transactions = getPlaidTransactions();

    const summaryMap = {};

    transactions.forEach(tx => {
      if (!tx.date) return;

      const dateObj = new Date(tx.date);
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