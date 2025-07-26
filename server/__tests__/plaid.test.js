const mockPlaidClient = require('../mock/plaidClientMock');

// Mock the actual plaidClient used in the service
jest.mock('../services/plaidService', () => ({
  plaidClient: mockPlaidClient
}));

const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

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