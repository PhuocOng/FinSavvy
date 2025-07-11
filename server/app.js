const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const allowedOrigins = ['http://localhost:3000']

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

module.exports = app;
