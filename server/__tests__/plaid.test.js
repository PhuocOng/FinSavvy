const request = require('supertest');
const app = require('../app');
const plaidClient = require('../config/plaid'); 
const User = require('../models/userModel');

// Mock the plaid client from the correct file path
jest.mock('../config/plaid');

// Mock the User model to prevent database errors
jest.mock('../models/userModel');

// Mock the login middleware
jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { id: 'mockUserId' };
  next();
});

describe('Plaid Routes', () => {
  it('POST /api/plaid/create_link_token should return status 200', async () => {
    // Tell the fake Plaid client what to return
    plaidClient.linkTokenCreate.mockResolvedValue({ data: { link_token: 'fake-token' } });

    const res = await request(app).post('/api/plaid/create_link_token');
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/plaid/exchange_public_token should return status 200', async () => {
    // Tell the fake Plaid client what to return
    plaidClient.itemPublicTokenExchange.mockResolvedValue({ data: { access_token: 'fake-access-token' } });
    // Tell the fake User model to do nothing when updated
    User.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post('/api/plaid/exchange_public_token')
      .send({ public_token: 'fake-public-token' });

    expect(res.statusCode).toBe(200);
  });
});