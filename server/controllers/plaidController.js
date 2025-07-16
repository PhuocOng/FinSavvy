import { plaidClient  } from "../services/plaidService.js";

// POST /api/plaid/exchange_token
export const exchangeToken = async (req, res) => {
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


