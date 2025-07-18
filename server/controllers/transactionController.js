// Transaction Controllers

const fs = require('fs');
const path = require('path');

const getTransactions = (req, res) => {
  const filePath = path.join(__dirname, '../mock/plaid_transaction.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({error: 'Could not load mock transactions'});
    }

    try {
      const parsedData = JSON.parse(data);
      const rawTransactions = parsedData.transactions;

      const cleanedTransactions = rawTransactions.map(txn => {
        // Format category name (remove underscores and capitalize)
        const formatCategory = (category) => {
          if (!category) return "Uncategorized";
          return category.toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        };

        return {
          id: txn.transaction_id, 
          date: txn.date,
          description: txn.name || txn.merchant_name,
          amount: txn.amount,
          category: formatCategory(txn.personal_finance_category?.primary),
          type: txn.amount > 0 ? 'expense' : 'income' // Plaid uses positive for expenses
        };
      });

      res.json({ transactions: cleanedTransactions });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({error: 'Invalid JSON structure'});
    }
  });
};

module.exports = { getTransactions };