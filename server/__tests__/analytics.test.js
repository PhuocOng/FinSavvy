const request = require('supertest');
const express = require('express');
const analyticsRouter = require('../routes/analytics');
const Transaction = require('../models/transactionModel');

jest.mock('../models/transactionModel');

const app = express();
app.use(express.json());

// Mock middleware to simulate authenticated user
app.use((req, res, next) => {
  req.user = { id: 'mockUserId' };
  next();
});

app.use('/api/analytics', analyticsRouter);

describe('Analytics Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/analytics/category-summary returns 200', async () => {
    Transaction.aggregate.mockResolvedValue([
      { category: 'Food', totalAmount: 100 },
    ]);

    const res = await request(app).get('/api/analytics/category-summary');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/analytics/monthly-summary returns 200', async () => {
    Transaction.aggregate.mockResolvedValue([
      { month: '2025-08', totalAmount: 200 },
    ]);

    const res = await request(app).get('/api/analytics/monthly-summary');
    expect(res.statusCode).toBe(200);
  });
});
