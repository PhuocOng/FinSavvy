import plaid from 'plaid'
import dotenv from 'dotenv';
dotenv.config();

export const plaidClient = new plaid.PlaidApi({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments[process.env.PLAID_ENV],
});
