const request = require('supertest');
const app = require('../app');
const Transaction = require('../models/transactionModel');

// Mock the database model to prevent errors
jest.mock('../models/transactionModel');

// Mock the login middleware to simulate a logged-in user
jest.mock('../middleware/auth', () => (req, res, next) => {
  req.user = { id: 'mockUserId' }; // Pretend a user is logged in
  next();
});

describe('Analytics Routes', () => {
  it('GET /api/analytics/category-summary should return status 200', async () => {
    // Tell the fake database to return an empty array
    Transaction.aggregate.mockResolvedValue([]);

    const res = await request(app).get('/api/analytics/category-summary');
    expect(res.statusCode).toBe(200);
  });

  it('GET /api/analytics/monthly-summary should return status 200', async () => {
    // Tell the fake database to return an empty array
    Transaction.aggregate.mockResolvedValue([]);

    const res = await request(app).get('/api/analytics/monthly-summary');
    expect(res.statusCode).toBe(200);
  });
});