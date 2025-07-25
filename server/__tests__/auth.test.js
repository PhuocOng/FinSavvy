const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const request = supertest(app);
const User = require('../models/User');

jest.setTimeout(30000); 

// Mock OpenAI to avoid real API calls
jest.mock('../config/openai.config', () => ({
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue({ choices: [{ message: { content: 'Mock response' } }] }),
    },
  },
}));

// Mock Nodemailer
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
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/finsavvy-test';
    console.log('Connecting to MongoDB test...');
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB.');
      await User.deleteOne({ email: testUser.email }); // Clean slate
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  });

  afterAll(async () => {
    try {
      await User.deleteOne({ email: testUser.email }); // Clean up
      await mongoose.connection.dropDatabase(); // Optional
      await mongoose.connection.close();
      console.log('Disconnected from MongoDB.');
    } catch (err) {
      console.error('Teardown error:', err);
    }
  });

  it('should register a new user', async () => {
    const res = await request.post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User registered successfully!');
    expect(transporter.sendMail).toHaveBeenCalled();
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
