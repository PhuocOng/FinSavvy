const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

jest.mock('../services/plaidService', () => ({
  plaidClient: {
    itemPublicTokenExchange: jest.fn().mockResolvedValue({
      data: {
        access_token: 'mock_access_token'
      }
    }),
    transactionsGet: jest.fn().mockResolvedValue({
      data: {
        transactions: [
          {
            name: 'Mock Coffee Shop',
            amount: 4.5,
            date: '2025-07-24'
          },
          {
            name: 'Mock Grocery',
            amount: 20.0,
            date: '2025-07-23'
          }
        ]
      }
    })
  }
}));

describe('Plaid Routes', () => {
    it('POST /api/plaid/exchange_token -> 200', async () => {
        const res = (await request.post('/api/plaid/exchange_token').send({
            public_token: 'public-sandbox-abc123'
        }));
        expect(res.statusCode).toBe(200);
    });

    it('GET /api/plaid/transactions -> 200', async () => {
        const res = await request.get('/api/plaid/transactions').query({
            access_token: 'mock_access_token'
        });
        expect(res.statusCode).toBe(200);
    });
});