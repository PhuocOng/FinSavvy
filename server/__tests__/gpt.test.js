const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('GPT Routes', () => {
    it ('POST /api/gpt/advice → 200', async () => {
        const res = await request.post('/api/gpt/advice').send({
            prompt: [{ role: 'user', content: 'What are some budgeting tips?' }]
        });
        expect(res.statusCode).toBe(200);
    });

});