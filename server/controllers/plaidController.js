const plaidClient = require('../config/plaid');
const User = require('../models/User');

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

// GET /api/plaid/transactions
const getTransactions = async (req, res) => {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: 'Missing access_token' });
  }

  // change the hardcode later
  const startDate = '2024-01-01'; 
  const endDate = '2024-12-31';

  try {
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate,
      end_date: endDate,
      options: { count: 100, offset: 0 },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


module.exports = { createLinkToken, exchangePublicToken, getTransactions };
