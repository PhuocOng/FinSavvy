const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);
const User = require('../models/User');

// Increase timeout for slower operations like DB or email
jest.setTimeout(15000);

// Mock OpenAI to prevent real API calls
jest.mock('../config/openai.config', () => ({
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue({ choices: [{ message: { content: 'Mock response' } }] }),
    },
  },
}));

// Mock nodemailer to prevent real emails
jest.mock('../config/nodemailer', () => ({
  sendMail: jest.fn().mockResolvedValue(true),
}));
const transporter = require('../config/nodemailer');

describe('Authentication Routes', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'TestPass123',
  };

  beforeAll(async () => {
    // Connect to your test database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:5000/finsavvy-test';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteOne({ email: testUser.email }); // clean up user if exists
  });

  afterAll(async () => {
    await User.deleteOne({ email: testUser.email }); // clean up again after tests
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request.post('/api/auth/register').send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User registered successfully!');
    expect(transporter.sendMail).toHaveBeenCalled(); // checks email was "sent"
  });

  it('should not register the same user again', async () => {
    const res = await request.post('/api/auth/register').send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('User already exists');
  });

  it('should log in a registered user', async () => {
    const res = await request.post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should not log in with wrong password', async () => {
    const res = await request.post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Invalid password');
  });
});
