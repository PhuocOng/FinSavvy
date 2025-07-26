const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Transaction Routes', () => {
    it('GET /api/transactions → 200', async () => {
        const res = await request.get('/api/transactions');
        expect(res.statusCode).toBe(200);
    });

});