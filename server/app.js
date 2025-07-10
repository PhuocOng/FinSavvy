const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

module.exports = app;
