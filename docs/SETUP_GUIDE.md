# FinSavvy Setup Guide

## Prerequisites

Before setting up FinSavvy, ensure you have the following software installed:

### Required Software
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **MongoDB** (v5.0 or higher) or MongoDB Atlas account
- **Git** for version control

### Optional but Recommended
- **MongoDB Compass** for database visualization
- **Postman** or similar API testing tool
- **VS Code** or preferred code editor

## Project Overview

FinSavvy is a full-stack personal finance management application with:
- **Frontend**: React 19.1.0 with Vite, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **Email Service**: Nodemailer with Brevo (formerly Sendinblue)
- **AI Integration**: OpenAI GPT-4 for financial advice
- **Bank Integration**: Plaid API for transaction data
- **Charts**: Recharts for data visualization

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd finsavvy
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

Key backend dependencies:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `nodemailer` - Email service
- `openai` - AI integration
- `plaid` - Banking API
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

#### Frontend Dependencies
```bash
cd ../client
npm install
```

Key frontend dependencies:
- `react` & `react-dom` - Core React
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `recharts` - Chart library
- `tailwindcss` - CSS framework
- `framer-motion` - Animations
- `react-toastify` - Notifications

### 3. Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following environment variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/finsavvy
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finsavvy

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# Email Configuration (Brevo/Sendinblue)
SMTP_USER=your-brevo-email@example.com
SMTP_PASSWORD=your-brevo-smtp-password
SENDER_EMAIL=your-sender-email@example.com

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key

# Plaid Configuration (for bank integration)
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret-key
PLAID_ENV=sandbox
# Options: sandbox, development, production

# Cloudinary Configuration (for file uploads - optional)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```bash
cd ../client
touch .env
```

Add the following:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000

# Optional: Plaid Configuration for frontend
VITE_PLAID_ENV=sandbox
```

### 4. Database Setup

#### Option A: Local MongoDB Installation

1. **Install MongoDB Community Edition:**
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service:**
   ```bash
   # macOS with Homebrew
   brew services start mongodb/brew/mongodb-community
   
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

3. **Create the database (optional - will be created automatically):**
   ```bash
   mongosh
   use finsavvy
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP address to the IP whitelist
4. Create a database user
5. Get the connection string and update `MONGODB_URI` in your `.env` file

### 5. External Service Configuration

#### Email Service (Brevo/Sendinblue)

1. Create account at [Brevo](https://www.brevo.com/)
2. Go to SMTP & API settings
3. Generate SMTP credentials
4. Update `SMTP_USER` and `SMTP_PASSWORD` in your `.env` file

#### OpenAI API

1. Create account at [OpenAI](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create a new API key
4. Update `OPENAI_API_KEY` in your `.env` file
5. Ensure you have billing set up for API usage

#### Plaid API (Optional - for bank integration)

1. Create account at [Plaid](https://plaid.com/)
2. Get your `client_id` and `secret` keys
3. Update `PLAID_CLIENT_ID` and `PLAID_SECRET` in your `.env` file
4. Start with `sandbox` environment for testing

### 6. Start Development Servers

#### Start Backend Server
```bash
cd server
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:3000` (or next available port)

### 7. Verify Installation

#### Test Backend API
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running!"
}
```

#### Test Frontend
Open your browser and navigate to `http://localhost:3000`

You should see the FinSavvy landing page.

## Production Deployment

### Backend Deployment

#### Environment Setup
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Set secure JWT secret (32+ characters)
5. Use production Plaid environment if applicable

#### Build and Start
```bash
cd server
npm start
```

#### Recommended Hosting Platforms
- **Railway** - Simple deployment with built-in databases
- **Heroku** - Easy deployment with add-ons
- **DigitalOcean App Platform** - Full-featured platform
- **AWS Elastic Beanstalk** - Scalable AWS solution

### Frontend Deployment

#### Build for Production
```bash
cd client
npm run build
```

This creates a `dist` folder with optimized production files.

#### Recommended Hosting Platforms
- **Vercel** - Automatic deployments from Git
- **Netlify** - Simple drag-and-drop deployment
- **GitHub Pages** - Free hosting for static sites
- **AWS S3 + CloudFront** - Scalable AWS solution

#### Environment Variables for Production
Update `VITE_BACKEND_URL` to point to your production backend URL.

### Docker Deployment (Optional)

#### Dockerfile for Backend
Create `server/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Dockerfile for Frontend
Create `client/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
Create `docker-compose.yml` in the root directory:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/finsavvy
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Run with:
```bash
docker-compose up -d
```

## Troubleshooting

### Common Issues

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check MongoDB URI in `.env` file
- For Atlas, verify IP whitelist and credentials

#### CORS Errors
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**
- Verify `VITE_BACKEND_URL` in frontend `.env`
- Check CORS configuration in `server/app.js`
- Ensure credentials are properly configured

#### JWT Token Issues
```
JsonWebTokenError: invalid signature
```

**Solutions:**
- Clear browser cookies and localStorage
- Verify `JWT_SECRET` is set in backend `.env`
- Ensure the secret is consistent across restarts

#### Email Service Not Working
```
Error: Invalid login: 534 Authentication failed
```

**Solutions:**
- Verify SMTP credentials in Brevo account
- Check `SMTP_USER` and `SMTP_PASSWORD` in `.env`
- Ensure Brevo account is verified

#### OpenAI API Errors
```
Error: You exceeded your current quota
```

**Solutions:**
- Check OpenAI billing and usage limits
- Verify API key is valid and active
- Ensure sufficient credits are available

### Development Tips

1. **Use Environment-Specific Configs:**
   - Development: Use local MongoDB and sandbox APIs
   - Production: Use cloud databases and production APIs

2. **Monitor Logs:**
   ```bash
   # Backend logs
   cd server && npm run dev
   
   # Frontend logs
   cd client && npm run dev
   ```

3. **Database Management:**
   - Use MongoDB Compass for visual database management
   - Regularly backup production data
   - Monitor database performance

4. **API Testing:**
   - Use Postman collections for API testing
   - Test authentication flows thoroughly
   - Verify CORS configurations

## Security Considerations

### Production Security Checklist

- [ ] Use strong, unique JWT secrets (32+ characters)
- [ ] Enable HTTPS for all connections
- [ ] Validate and sanitize all user inputs
- [ ] Use environment variables for all secrets
- [ ] Implement rate limiting on API endpoints
- [ ] Keep dependencies updated
- [ ] Use secure headers (helmet.js)
- [ ] Implement proper error handling (don't expose stack traces)
- [ ] Use HTTPS-only cookies in production
- [ ] Implement proper CORS policies
- [ ] Regular security audits with `npm audit`

### Environment Variables Security

- Never commit `.env` files to version control
- Use different secrets for different environments
- Rotate secrets regularly
- Use secret management services for production
- Limit access to environment variables

## Performance Optimization

### Backend Optimization
- Implement database indexing for frequently queried fields
- Use connection pooling for MongoDB
- Implement caching for frequently accessed data
- Optimize API response sizes
- Use compression middleware

### Frontend Optimization
- Implement lazy loading for routes
- Optimize images and assets
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Minimize bundle size with tree shaking

## Monitoring and Logging

### Recommended Tools
- **Backend Monitoring:** PM2, New Relic, or DataDog
- **Frontend Monitoring:** Sentry or LogRocket
- **Database Monitoring:** MongoDB Atlas monitoring or Mongoose debug
- **API Monitoring:** Postman monitors or Pingdom

### Log Management
- Implement structured logging
- Use log levels appropriately
- Store logs securely
- Monitor error rates and patterns

## Support and Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community Resources
- Stack Overflow for technical questions
- GitHub Issues for bug reports
- Discord/Slack communities for real-time help

### Additional Tools
- **Database GUI:** MongoDB Compass
- **API Testing:** Postman, Insomnia
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git with GitHub/GitLab

This setup guide should get you up and running with FinSavvy. For specific issues or advanced configurations, refer to the individual service documentation or create an issue in the project repository.