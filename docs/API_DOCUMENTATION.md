# FinSavvy API Documentation

## Overview

FinSavvy is a personal finance management application that provides APIs for user authentication, transaction management, financial analytics, and AI-powered financial advice. The backend is built with Node.js and Express, using MongoDB for data persistence.

## Base URL

```
http://localhost:5000/api
```

## Authentication

FinSavvy uses JWT (JSON Web Tokens) for authentication. The JWT token is stored as an HTTP-only cookie named `token`.

### Authentication Headers

Most endpoints require authentication. The JWT token is automatically included via cookies for authenticated requests.

## API Endpoints

### Health Check

#### GET /api/health

Check if the server is running properly.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running!"
}
```

### Greetings

#### GET /api/greetings

A basic endpoint that returns greeting messages.

**Response:**
```json
{
  "message": "Greetings from FinSavvy API!",
  "friends": ["Phuong", "Tram", "Trung", "Quang", "Chi"],
  "greetings": ["Hi Phuong!", "Hi Tram!", "Hi Trung!", "Hi Quang!", "Hi Chi!"]
}
```

## Authentication API (/api/auth)

### Register User

#### POST /api/auth/register

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com", 
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Account created successfully. Please verify your email."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

**Notes:**
- Password is hashed using bcrypt with salt rounds of 10
- JWT token is set as HTTP-only cookie upon successful registration
- A verification OTP is sent to the user's email

### Login User

#### POST /api/auth/login

Authenticate a user and create a session.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Logout User

#### POST /api/auth/logout

End the user session and clear authentication cookie.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Send Verification OTP

#### POST /api/auth/send-verify-otp

Send a verification OTP to the user's email.

**Authentication:** Required

**Response (Success):**
```json
{
  "success": true,
  "message": "Verification OTP sent successfully"
}
```

### Verify Account

#### POST /api/auth/verify-account

Verify user account using OTP.

**Authentication:** Required

**Request Body:**
```json
{
  "otp": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Account verified successfully"
}
```

### Check Authentication Status

#### GET /api/auth/is-auth

Check if the current user is authenticated.

**Authentication:** Required

**Response (Authenticated):**
```json
{
  "success": true,
  "message": "User is authenticated"
}
```

**Response (Not Authenticated):**
```json
{
  "success": false,
  "message": "Not authenticated"
}
```

### Send Password Reset OTP

#### POST /api/auth/send-reset-otp

Send a password reset OTP to user's email.

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password reset OTP sent successfully"
}
```

### Reset Password

#### POST /api/auth/reset-password

Reset user password using OTP.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## User Management API (/api/user)

### Get User Data

#### GET /api/user/data

Retrieve authenticated user's profile information.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "userData": {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "isAccountVerified": true
  }
}
```

## Transaction Management API (/api/transactions)

### Get Transactions

#### GET /api/transactions

Retrieve all transactions for the authenticated user.

**Authentication:** Required

**Response:**
```json
{
  "transactions": [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "userId": "60d0fe4f5311236168a109ca",
      "name": "Grocery Shopping",
      "amount": 85.50,
      "category": "Food",
      "date": "2024-01-15T00:00:00.000Z",
      "type": "expense",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Add Manual Expense

#### POST /api/transactions/manual-expenses

Add a new manual expense transaction.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Coffee Shop",
  "amount": 4.50,
  "category": "Food",
  "date": "2024-01-15"
}
```

**Available Categories:**
- Food
- Transportation
- Shopping
- Entertainment
- Health
- Education
- Bills
- Others

**Response (Success):**
```json
{
  "_id": "60d0fe4f5311236168a109cc",
  "userId": "60d0fe4f5311236168a109ca",
  "name": "Coffee Shop",
  "amount": 4.50,
  "category": "Food",
  "date": "2024-01-15T00:00:00.000Z",
  "type": "expense",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Response (Error):**
```json
{
  "error": "Missing required fields"
}
```

### Delete Transaction

#### DELETE /api/transactions/:id

Delete a specific transaction by ID.

**Authentication:** Required

**Parameters:**
- `id` (string): Transaction ID to delete

**Response (Success):**
```json
{
  "message": "Transaction deleted successfully"
}
```

**Response (Error):**
```json
{
  "error": "Transaction not found"
}
```

## Analytics API (/api/analytics)

### Get Category Summary

#### GET /api/analytics/category-summary

Get spending summary grouped by categories.

**Response:**
```json
[
  {
    "category": "Food",
    "totalAmount": 245.50
  },
  {
    "category": "Transportation", 
    "totalAmount": 89.00
  },
  {
    "category": "Entertainment",
    "totalAmount": 156.75
  }
]
```

### Get Monthly Summary

#### GET /api/analytics/monthly-summary

Get spending summary grouped by months.

**Response:**
```json
[
  {
    "month": "2024-01",
    "totalAmount": 1245.50
  },
  {
    "month": "2024-02",
    "totalAmount": 987.25
  }
]
```

## AI Advice API (/api/gpt/advice)

### Get Financial Advice

#### POST /api/gpt/advice

Get AI-powered financial advice based on conversation context.

**Authentication:** Required

**Request Body:**
```json
{
  "prompt": [
    {
      "role": "user",
      "content": "I spent $200 on entertainment this month. Is this too much?"
    }
  ]
}
```

**Response:**
```json
{
  "userId": "60d0fe4f5311236168a109ca",
  "reply": "Based on typical budgeting guidelines, entertainment should represent about 5-10% of your monthly income. If $200 represents more than 10% of your monthly income, you might want to consider reducing entertainment expenses..."
}
```

## Plaid Integration API (/api/plaid)

### Exchange Token

#### POST /api/plaid/exchange_token

Exchange a public token for an access token (Plaid integration).

**Request Body:**
```json
{
  "public_token": "public-sandbox-12345..."
}
```

### Get Plaid Transactions

#### GET /api/plaid/transactions

Retrieve transactions from connected bank accounts via Plaid.

**Response:**
```json
{
  "transactions": [
    {
      "account_id": "account_123",
      "amount": 12.50,
      "date": "2024-01-15",
      "name": "STARBUCKS #1234",
      "merchant_name": "Starbucks",
      "category": ["Food and Drink", "Restaurants", "Coffee Shop"]
    }
  ]
}
```

## Data Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  verifyOtp: String (default: ''),
  verifyOtpExpireAt: Number (default: 0),
  isAccountVerified: Boolean (default: false),
  resetOtp: String (default: ''),
  resetOtpExpireAt: Number (default: 0)
}
```

### Transaction Model

```javascript
{
  userId: ObjectId (required, ref: 'User'),
  name: String (required),
  amount: Number (required),
  category: String (required, enum: ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Others']),
  date: Date (required),
  type: String (required, enum: ['income', 'expense']),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (missing/invalid parameters)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error description",
  "success": false,
  "message": "Human-readable error message"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. It's recommended to implement rate limiting for production use.

## CORS Configuration

The API accepts requests from:
- `http://localhost:3000` (React development server)

Credentials are supported for cross-origin requests.

## Security Notes

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens expire after 7 days
- HTTP-only cookies are used for token storage
- OTP codes expire after 24 hours for email verification
- Users can only access/modify their own data (enforced by userId filtering)

## Development & Testing

For development:
```bash
cd server
npm run dev
```

For testing:
```bash
npm test
```

The server runs on port 5000 by default, configurable via the `PORT` environment variable.