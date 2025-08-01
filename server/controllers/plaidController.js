const plaidClient = require('../config/plaid');
const User = require('../models/User');
const Transaction = require('../models/transactionModel');

// Create a link_token for the client to use
const createLinkToken = async (req, res) => {
  // The user's ID should be available from your JWT authentication middleware
  const clientUserId = req.user.id;

  const request = {
    user: { client_user_id: clientUserId },
    client_name: 'FinSavvy',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
  };

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(request);
    res.json(createTokenResponse.data);
  } catch (error) {
    console.error("Error creating link token:", error.response.data);
    res.status(500).json({ error: error.message });
  }
};

// Exchange the public_token from the client for an access_token
const exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;
  const userId = req.user.id;

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const { access_token, item_id } = response.data;

    // Save the accessToken and itemId to the user in your database
    await User.findByIdAndUpdate(userId, {
      plaidAccessToken: access_token,
      plaidItemId: item_id,
    });

    res.json({ message: 'Bank account linked successfully!' });
  } catch (error) {
    console.error("Error exchanging public token:", error.response.data);
    res.status(500).json({ error: error.message });
  }
};

const syncTransactions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.plaidAccessToken) {
      return res.status(400).json({ error: 'User has not linked a bank account.' });
    }

    const accessToken = user.plaidAccessToken;
    const plaidRequest = { access_token: accessToken };

    const plaidResponse = await plaidClient.transactionsSync(plaidRequest);
    const plaidTransactions = plaidResponse.data.added;

    for (const plaidTx of plaidTransactions) {
      // Use findOneAndUpdate with upsert to avoid creating duplicate transactions
      await Transaction.findOneAndUpdate(
        { transactionId: plaidTx.transaction_id }, // Condition to find existing doc
        { // Data to insert or update
          userId: user._id,
          transactionId: plaidTx.transaction_id,
          name: plaidTx.name,
          amount: plaidTx.amount,
          date: new Date(plaidTx.date),
          category: plaidTx.personal_finance_category?.primary || 'Other',
          type: plaidTx.amount > 0 ? 'income' : 'expense',
        },
        { upsert: true } // Option to create a new doc if none is found
      );
    }

    res.status(200).json({ message: 'Transactions synced successfully.' });

  } catch (error) {
    console.error('Failed to sync Plaid transactions', error);
    res.status(500).json({ error: 'Failed to sync transactions' });
  }
};

module.exports = { createLinkToken, exchangePublicToken, syncTransactions };
