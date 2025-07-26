const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

// Extend timeout globally
jest.setTimeout(30000);

// 🧪 Mock OpenAI and Nodemailer to avoid real calls
jest.mock('../config/openai.config', () => ({
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue({
        choices: [{ message: { content: 'Mock response' } }],
      }),
    },
  },
}));
jest.mock('../config/nodemailer', () => ({
  sendMail: jest.fn().mockResolvedValue(true),
}));

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'TestPass123',
  };

  it('POST /api/auth/register → 200', async () => {
    const res = await request.post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/auth/register again → 200', async () => {
    const res = await request.post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/auth/login (correct credentials) → 200', async () => {
    const res = await request.post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/auth/login (wrong password) → 200', async () => {
    const res = await request.post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.statusCode).toBe(200);
  });
});
