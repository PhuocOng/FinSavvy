import { plaidClient  } from "../services/plaidService.js";

// POST /api/plaid/exchange_token
const exchangeToken = async (req, res) => {
  const { public_token } = req.body
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    }); 
    const { access_token, item_id } = response.data;
    res.json({ access_token, item_id });
  } catch (error) {
    res.status(500).json({ error: "Failed to exchange token"});
  }
}

// GET /api/plaid/transactions
export const getTransactions = async (req, res) => {
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
