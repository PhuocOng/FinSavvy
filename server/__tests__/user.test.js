const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('User Routes', () => {
    it('GET /api/transactions → 200', async () => {
        const res = await request.get('/api/user/data').set('Cookie', ['token=valid_token']);
        expect(res.statusCode).toBe(200);
    });

});