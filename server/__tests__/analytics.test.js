const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Analytics Routes', () => {
    it('should return category summary', async () => {
        const res = await request.get('/api/analytics/category-summary');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('category');
        expect(res.body[0]).toHaveProperty('totalAmount');

    });

    it('should return monthly summary', async () => {
        const res = await request.get('/api/analytics/monthly-summary');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('month');
        expect(res.body[0]).toHaveProperty('totalAmount');
    });
})