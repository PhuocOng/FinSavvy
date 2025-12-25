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

// Create a router for the API
const apiRouter = express.Router();

const allowedOrigins = [
  'http://localhost:3000', 
  'https://fin-savvy-frontend.vercel.app', 
  'https://finsavvy.online',
  'http://pomentorship.com',
  'https://pomentorship.com'
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Root
app.get('/', (req, res) => {
  res.send('API Working fine');
});

// Define routes in apiRouter
apiRouter.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

apiRouter.get('/greetings', (req, res) => {
  const friends = ['Phuong', 'Tram', 'Trung', 'Quang', 'Chi'];
  const greetings = friends.map(friend => `Hi ${friend}!`);
  res.json({
    message: 'Greetings from FinSavvy API!',
    friends: friends,
    greetings: greetings
  });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/plaid', plaidRoutes);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/transactions', transactionRoutes);
apiRouter.use('/gpt/advice', gptadviceRoutes);

// Thêm route cho path không có trailing slash
apiRouter.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'FinSavvy API is running!' });
});

// Mount with global prefix
app.use('/finsavvy/api', apiRouter);

module.exports = app;