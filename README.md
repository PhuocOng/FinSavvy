# FinSavvy - Personal Finance Management Application

<div align="center">
  <img src="./client/src/assets/logo.png" alt="FinSavvy Logo" width="200"/>
  
  <p><strong>Take control of your financial future with intelligent expense tracking and AI-powered advice</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)
</div>

## 🌟 Overview

FinSavvy is a modern, full-stack personal finance management application designed to help users take control of their financial health. With intelligent expense tracking, beautiful data visualizations, and AI-powered financial advice, FinSavvy makes managing your money both simple and insightful.

### ✨ Key Features

- **🔐 Secure Authentication** - JWT-based authentication with email verification
- **💰 Expense Tracking** - Manual expense entry with categorization
- **🏦 Bank Integration** - Plaid API integration for automatic transaction import
- **📊 Visual Analytics** - Interactive charts and spending summaries
- **🤖 AI Financial Advisor** - GPT-4 powered personalized financial advice
- **📱 Responsive Design** - Beautiful, mobile-first user interface
- **🎨 Modern UI/UX** - Built with Tailwind CSS and Framer Motion
- **📈 Real-time Charts** - Dynamic data visualization with Recharts

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- MongoDB 5.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finsavvy
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` files in both `server` and `client` directories:
   
   **Server (.env):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/finsavvy
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   SMTP_USER=your-email@example.com
   SMTP_PASSWORD=your-smtp-password
   OPENAI_API_KEY=sk-your-openai-api-key
   ```
   
   **Client (.env):**
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

5. **Start the development servers**
   
   **Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Visit the application**
   
   Open your browser and navigate to `http://localhost:3000`

## 🏗️ Architecture

### Technology Stack

#### Frontend
- **React 19.1.0** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router DOM 7.6.3** - Client-side routing
- **Recharts 3.1.0** - Chart library for data visualization
- **Axios 1.10.0** - HTTP client for API communication
- **Framer Motion 12.23.6** - Animation library

#### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service integration
- **OpenAI API** - AI-powered financial advice
- **Plaid API** - Bank account integration

### Project Structure

```
finsavvy/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AddExpense/ # Expense creation workflow
│   │   │   ├── ChatBot/    # AI chatbot functionality
│   │   │   ├── Dashboard/  # Data visualization components
│   │   │   └── Navbar/     # Navigation components
│   │   ├── context/        # React Context for state management
│   │   ├── pages/          # Page-level components
│   │   ├── assets/         # Static assets and images
│   │   └── __tests__/      # Frontend test files
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend application
│   ├── controllers/        # Business logic controllers
│   ├── models/             # MongoDB data models
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom middleware functions
│   ├── config/             # Configuration files
│   ├── services/           # External service integrations
│   ├── __tests__/          # Backend test files
│   └── package.json        # Backend dependencies
├── docs/                   # Documentation files
└── README.md              # This file
```

## 📚 Documentation

### Comprehensive Guides

- **[API Documentation](./docs/API_DOCUMENTATION.md)** - Complete backend API reference with examples
- **[Component Documentation](./docs/COMPONENT_DOCUMENTATION.md)** - React component usage and props
- **[Setup Guide](./docs/SETUP_GUIDE.md)** - Detailed installation and configuration
- **[Usage Examples](./docs/USAGE_EXAMPLES.md)** - Practical integration examples and patterns

### Quick Reference

#### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions/manual-expenses` - Add expense
- `POST /api/gpt/advice` - Get AI financial advice
- `GET /api/analytics/category-summary` - Spending by category

#### Key Components
- `<TransactionTable />` - Display transactions with filtering
- `<PieChart />` - Category-wise expense visualization
- `<BarChart />` - Monthly income vs expenses
- `<AddExpenseForm />` - Multi-step expense creation
- `<ChatForm />` - AI chatbot interface

## 🎯 Features in Detail

### 🔒 Authentication System
- Secure user registration with email verification
- JWT-based authentication with HTTP-only cookies
- Password reset functionality with OTP verification
- Persistent login sessions with automatic token refresh

### 💸 Expense Management
- Manual expense entry with category selection
- Transaction categorization (Food, Transportation, Shopping, etc.)
- Real-time expense tracking and management
- Transaction deletion and modification

### 📊 Financial Analytics
- Category-wise spending breakdown with pie charts
- Monthly income vs expense trends
- Interactive data visualization
- Spending pattern analysis

### 🤖 AI Financial Advisor
- GPT-4 powered conversational AI
- Personalized financial advice based on spending patterns
- Context-aware responses with conversation history
- Real-time chat interface

### 🏦 Bank Integration (Plaid)
- Secure bank account connection
- Automatic transaction import
- Real-time balance updates
- Support for multiple financial institutions

## 🛡️ Security Features

- **Password Security** - bcrypt hashing with salt rounds
- **JWT Authentication** - Secure token-based authentication
- **HTTP-only Cookies** - Protection against XSS attacks
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Server-side data validation
- **Environment Variables** - Secure configuration management

## 🎨 Design Principles

### User Experience
- **Mobile-First Design** - Responsive across all devices
- **Intuitive Navigation** - Clear and consistent user interface
- **Visual Feedback** - Loading states and success/error messages
- **Accessibility** - WCAG compliant design patterns

### Performance
- **Optimized Bundle Size** - Tree shaking and code splitting
- **Efficient Rendering** - React memoization and optimization
- **Fast Database Queries** - Optimized MongoDB queries
- **CDN Assets** - Optimized asset delivery

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### Test Coverage
- Unit tests for API endpoints
- Integration tests for authentication flows
- Component testing for React components
- End-to-end testing for critical user journeys

## 🚀 Deployment

### Development
```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

### Production Build
```bash
# Frontend build
cd client && npm run build

# Backend production
cd server && npm start
```

### Deployment Platforms
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🤝 Contributing

We welcome contributions to FinSavvy! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer Team** - Phuong, Tram, Trung, Quang, Chi
- **Project Type** - Full-stack web application
- **Development Period** - 2024

## 🆘 Support

### Getting Help
- **Documentation** - Check the [docs](./docs/) directory for detailed guides
- **Issues** - Create a GitHub issue for bugs or feature requests
- **Discussions** - Use GitHub Discussions for questions and community support

### Common Issues
- **MongoDB Connection** - Ensure MongoDB is running and connection string is correct
- **CORS Errors** - Verify frontend and backend URLs in environment variables
- **Authentication Issues** - Clear browser cookies and check JWT secret configuration

## 🔮 Roadmap

### Upcoming Features
- [ ] **Budget Planning** - Set and track monthly budgets
- [ ] **Bill Reminders** - Automated bill payment notifications
- [ ] **Investment Tracking** - Portfolio management features
- [ ] **Financial Goals** - Savings goal setting and tracking
- [ ] **Mobile App** - React Native mobile application
- [ ] **Multi-currency Support** - International currency handling
- [ ] **Advanced Analytics** - Predictive spending analysis
- [ ] **Social Features** - Expense sharing and splitting

### Technical Improvements
- [ ] **Real-time Updates** - WebSocket integration
- [ ] **Advanced Caching** - Redis implementation
- [ ] **API Rate Limiting** - Enhanced security measures
- [ ] **Microservices** - Service-oriented architecture
- [ ] **Docker Support** - Containerization for deployment
- [ ] **CI/CD Pipeline** - Automated testing and deployment

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **Email** - [contact@finsavvy.com](mailto:contact@finsavvy.com)
- **GitHub** - [FinSavvy Repository](https://github.com/finsavvy/finsavvy)
- **Documentation** - [docs.finsavvy.com](https://docs.finsavvy.com)

---

<div align="center">
  <p>Made with ❤️ by the FinSavvy Team</p>
  <p>© 2024 FinSavvy. All rights reserved.</p>
</div>