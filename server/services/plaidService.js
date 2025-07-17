const dotenv = require('dotenv');
dotenv.config();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// Plaid client config
const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});
const plaidClient = new PlaidApi(config);

module.exports = { plaidClient };