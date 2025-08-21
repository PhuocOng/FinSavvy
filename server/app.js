const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes');
const analyticsRouter = require('./routes/analytics');
const transactionRoutes = require('./routes/transactionRoutes');
const gptadviceRoutes = require('./routes/gpt_advice');
const plaidRoutes = require('./routes/plaidRoutes');

const app = express();

// Allow requests from frontend (e.g. React on localhost:3000)
const allowedOrigins = ['http://localhost:3000', 'https://fin-savvy-frontend.vercel.app', 'http://54.164.194.78'];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true })); // ✅ CORS with credentials

// Root test route
app.get('/', (req, res) => {
  res.send('API Working fine');
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Basic greetings route
app.get('/api/greetings', (req, res) => {
  const friends = ['Phuong', 'Tram', 'Trung', 'Quang', 'Chi'];
  const greetings = friends.map(friend => `Hi ${friend}!`);

  res.json({
    message: 'Greetings from FinSavvy API!',
    friends: friends,
    greetings: greetings
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/plaid', plaidRoutes);
app.use('/api/analytics', analyticsRouter);
app.use('/api/transactions', transactionRoutes);
app.use('/api/gpt/advice', gptadviceRoutes);

module.exports = app;
