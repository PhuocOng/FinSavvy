const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const gptadviceRoutes = require('./routes/gpt_advice')
const transactionRouters = require('./routes/transactionRoutes');

const app = express();

const allowedOrigins = ['http://localhost:3000']

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Register analytics API routes under /api/analytics
// All routes inside analyticsRoutes will be prefixed with /api/analytics
const analyticsRouter = require('./routes/analytics');
app.use('/api/analytics', analyticsRouter);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);
app.use(cors({origin: allowedOrigins, credentials: true})) // enable cross-origin requests (frontend localhost: 3000 tp backend 5000) with credentials (cookies, auth headers)

// API endpoint – to quickly test server
app.get('/', (req, res) => {
  res.send("API Working fine");
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// Basic GET API to say Hi to friends
app.get('/api/greetings', (req, res) => {
  const friends = ['Phuong', 'Tram', 'Trung', 'Quang', 'Chi'];
  const greetings = friends.map(friend => `Hi ${friend}!`);
  
  res.json({
    message: 'Greetings from FinSavvy API!',
    friends: friends,
    greetings: greetings
  });
});

//GPT advice endpoint
app.use('/api/gpt/advice', gptadviceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Transaction Routes
app.use(transactionRouters);

module.exports = app;
