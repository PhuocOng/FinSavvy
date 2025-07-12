const fs = require('fs');
const path = require('path');
const router = require('../routes/transactionRoutes');

const getMockTransactions = (req, res) => {
    const filePath = path.join(__dirname, '..mock/plaid_transaction.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading files', err);
            return res.status(500).json({error: 'Could not load mock transaction'});
        }

        try {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({error: 'Invalid JSON Structure'});
        }
    });
};

module.exports = {
    getMockTransactions
};