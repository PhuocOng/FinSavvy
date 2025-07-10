const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register analytics API routes under /api/analytics
// All routes inside analyticsRoutes will be prefixed with /api/analytics
const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);

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
