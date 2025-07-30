# FinSavvy Usage Examples & Integration Guide

## Overview

This guide provides practical examples of how to use FinSavvy's APIs and components. It includes common use cases, integration patterns, and code examples for both frontend and backend development.

## API Usage Examples

### Authentication Flow

#### Complete Registration Process

```javascript
// Register a new user
const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password
    }, {
      withCredentials: true // Important for cookie-based auth
    });
    
    if (response.data.success) {
      console.log('User registered successfully');
      // User is automatically logged in after registration
      return response.data;
    }
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message);
    throw error;
  }
};

// Send verification OTP
const sendVerificationOTP = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/send-verify-otp', {}, {
      withCredentials: true
    });
    
    if (response.data.success) {
      console.log('Verification OTP sent to email');
    }
  } catch (error) {
    console.error('Failed to send OTP:', error.response?.data?.message);
  }
};

// Verify account with OTP
const verifyAccount = async (otp) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/verify-account', {
      otp: otp
    }, {
      withCredentials: true
    });
    
    if (response.data.success) {
      console.log('Account verified successfully');
      return true;
    }
  } catch (error) {
    console.error('Account verification failed:', error.response?.data?.message);
    return false;
  }
};

// Complete registration workflow
const completeRegistration = async (userInfo, otpCode) => {
  try {
    // Step 1: Register user
    await registerUser(userInfo);
    
    // Step 2: Send verification OTP (optional, sent automatically during registration)
    await sendVerificationOTP();
    
    // Step 3: Verify account
    const isVerified = await verifyAccount(otpCode);
    
    if (isVerified) {
      console.log('Registration completed successfully!');
    }
  } catch (error) {
    console.error('Registration workflow failed:', error);
  }
};
```

#### Login and Authentication Check

```javascript
// Login user
const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    }, {
      withCredentials: true
    });
    
    if (response.data.success) {
      console.log('Login successful');
      return response.data;
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message);
    throw error;
  }
};

// Check authentication status
const checkAuthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/is-auth', {
      withCredentials: true
    });
    
    return response.data.success;
  } catch (error) {
    console.log('User not authenticated');
    return false;
  }
};

// Get user data
const getUserData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/user/data', {
      withCredentials: true
    });
    
    if (response.data.success) {
      return response.data.userData;
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

// Complete login workflow
const handleLogin = async (email, password) => {
  try {
    // Step 1: Login
    await loginUser(email, password);
    
    // Step 2: Verify authentication
    const isAuth = await checkAuthStatus();
    
    if (isAuth) {
      // Step 3: Get user data
      const userData = await getUserData();
      console.log('Welcome,', userData.name);
      return userData;
    }
  } catch (error) {
    console.error('Login workflow failed:', error);
  }
};
```

#### Password Reset Flow

```javascript
// Complete password reset workflow
const resetPassword = async (email, newPassword) => {
  try {
    // Step 1: Request password reset OTP
    const otpResponse = await axios.post('http://localhost:5000/api/auth/send-reset-otp', {
      email
    });
    
    if (otpResponse.data.success) {
      console.log('Reset OTP sent to email');
      
      // In a real app, you'd get the OTP from user input
      // For demo purposes, assume we have the OTP
      const userEnteredOTP = prompt('Enter the OTP sent to your email:');
      
      // Step 2: Reset password with OTP
      const resetResponse = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        otp: userEnteredOTP,
        newPassword
      });
      
      if (resetResponse.data.success) {
        console.log('Password reset successfully');
        return true;
      }
    }
  } catch (error) {
    console.error('Password reset failed:', error.response?.data?.message);
    return false;
  }
};
```

### Transaction Management

#### Adding and Managing Expenses

```javascript
// Add a manual expense
const addExpense = async (expenseData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/transactions/manual-expenses', {
      name: expenseData.name,
      amount: parseFloat(expenseData.amount),
      category: expenseData.category,
      date: expenseData.date
    }, {
      withCredentials: true
    });
    
    console.log('Expense added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add expense:', error.response?.data?.error);
    throw error;
  }
};

// Get all transactions
const getTransactions = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/transactions', {
      withCredentials: true
    });
    
    return response.data.transactions;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
};

// Delete a transaction
const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/transactions/${transactionId}`, {
      withCredentials: true
    });
    
    console.log('Transaction deleted successfully');
    return true;
  } catch (error) {
    console.error('Failed to delete transaction:', error.response?.data?.error);
    return false;
  }
};

// Complete expense management workflow
const manageExpenses = async () => {
  try {
    // Add multiple expenses
    const expenses = [
      { name: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2024-01-15' },
      { name: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2024-01-15' },
      { name: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-15' }
    ];
    
    const addedExpenses = [];
    for (const expense of expenses) {
      const added = await addExpense(expense);
      addedExpenses.push(added);
      console.log(`Added: ${expense.name}`);
    }
    
    // Get all transactions
    const transactions = await getTransactions();
    console.log(`Total transactions: ${transactions.length}`);
    
    // Delete the first expense (demo purposes)
    if (addedExpenses.length > 0) {
      await deleteTransaction(addedExpenses[0]._id);
      console.log('Deleted first expense');
    }
    
    return transactions;
  } catch (error) {
    console.error('Expense management failed:', error);
  }
};
```

### Analytics and Reporting

```javascript
// Get category-wise spending summary
const getCategorySummary = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/analytics/category-summary');
    
    console.log('Category Summary:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch category summary:', error);
    return [];
  }
};

// Get monthly spending summary
const getMonthlySummary = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/analytics/monthly-summary');
    
    console.log('Monthly Summary:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch monthly summary:', error);
    return [];
  }
};

// Generate comprehensive spending report
const generateSpendingReport = async () => {
  try {
    // Get both summaries
    const [categoryData, monthlyData] = await Promise.all([
      getCategorySummary(),
      getMonthlySummary()
    ]);
    
    // Calculate total spending
    const totalSpending = categoryData.reduce((sum, cat) => sum + cat.totalAmount, 0);
    
    // Find top spending category
    const topCategory = categoryData.reduce((max, cat) => 
      cat.totalAmount > max.totalAmount ? cat : max, categoryData[0]);
    
    // Generate report
    const report = {
      totalSpending: totalSpending.toFixed(2),
      topSpendingCategory: topCategory?.category,
      topCategoryAmount: topCategory?.totalAmount.toFixed(2),
      categorySummary: categoryData,
      monthlyTrends: monthlyData,
      generatedAt: new Date().toISOString()
    };
    
    console.log('Spending Report Generated:', report);
    return report;
  } catch (error) {
    console.error('Failed to generate spending report:', error);
  }
};
```

### AI Financial Advice Integration

```javascript
// Get AI financial advice
const getFinancialAdvice = async (conversation) => {
  try {
    const response = await axios.post('http://localhost:5000/api/gpt/advice', {
      prompt: conversation
    }, {
      withCredentials: true
    });
    
    return response.data.reply;
  } catch (error) {
    console.error('Failed to get AI advice:', error.response?.data?.error);
    throw error;
  }
};

// Create a financial advisor chatbot
class FinancialAdvisorBot {
  constructor() {
    this.conversation = [
      { role: 'system', content: 'You are a helpful financial assistant' }
    ];
  }
  
  async askQuestion(question) {
    try {
      // Add user question to conversation
      this.conversation.push({ role: 'user', content: question });
      
      // Get AI response
      const response = await getFinancialAdvice(this.conversation);
      
      // Add AI response to conversation
      this.conversation.push({ role: 'assistant', content: response });
      
      return response;
    } catch (error) {
      console.error('Bot conversation failed:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  }
  
  getConversationHistory() {
    return this.conversation.filter(msg => msg.role !== 'system');
  }
  
  clearConversation() {
    this.conversation = [
      { role: 'system', content: 'You are a helpful financial assistant' }
    ];
  }
}

// Usage example
const useChatbot = async () => {
  const bot = new FinancialAdvisorBot();
  
  try {
    // Ask about budgeting
    let response = await bot.askQuestion('I spend $500 on food monthly. Is this reasonable for a single person?');
    console.log('Bot:', response);
    
    // Follow-up question
    response = await bot.askQuestion('What are some ways I can reduce my food expenses?');
    console.log('Bot:', response);
    
    // Check conversation history
    console.log('Conversation History:', bot.getConversationHistory());
  } catch (error) {
    console.error('Chatbot usage failed:', error);
  }
};
```

## React Component Usage Examples

### Using the Dashboard Components

#### Complete Dashboard Implementation

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './components/Dashboard/TransactionTable';
import PieChart from './components/Dashboard/PieChart';
import BarChart from './components/Dashboard/BarChart';
import FilterByCategory from './components/Dashboard/FilterByCategory';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available categories for filtering
  const categories = ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Others'];

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions when category filter changes
  useEffect(() => {
    if (categoryFilter) {
      setFilteredTransactions(
        transactions.filter(t => t.category === categoryFilter)
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, categoryFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/transactions', {
        withCredentials: true
      });
      
      setTransactions(response.data.transactions);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/transactions/${transactionId}`, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        // Remove deleted transaction from state
        setTransactions(prev => prev.filter(t => t._id !== transactionId));
        console.log('Transaction deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      setError('Failed to delete transaction');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Financial Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900">Total Transactions</h3>
            <p className="text-3xl font-bold text-blue-600">{transactions.length}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">
              ${transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900">Categories</h3>
            <p className="text-3xl font-bold text-green-600">
              {new Set(transactions.map(t => t.category)).size}
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <FilterByCategory 
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categories={categories}
            />
            
            <button
              onClick={() => setCategoryFilter('')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filter
            </button>
            
            <button
              onClick={fetchTransactions}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PieChart data={filteredTransactions} />
          <BarChart data={filteredTransactions} />
        </div>

        {/* Transactions Table */}
        <TransactionTable 
          transactions={filteredTransactions} 
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default Dashboard;
```

### Expense Form Integration

```jsx
import React, { useState } from 'react';
import AddExpenseForm from './components/AddExpense/AddExpenseForm';
import { toast } from 'react-toastify';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const categoryOptions = [
    'Food', 'Transportation', 'Shopping', 'Entertainment', 
    'Health', 'Education', 'Bills', 'Others'
  ];

  const handleAddExpense = (newExpense) => {
    // Add to local state
    setExpenses(prev => [...prev, newExpense]);
    
    // Show success message
    toast.success(`Added expense: ${newExpense.name}`);
    
    // Close form
    setShowForm(false);
    
    // Optional: Refresh parent component data
    // onExpenseAdded?.(newExpense);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="expense-manager">
      {/* Add Expense Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Add New Expense
      </button>

      {/* Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Add Expense</h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <AddExpenseForm
              onAdd={handleAddExpense}
              categoryOptions={categoryOptions}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Recent Expenses Display */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <div className="space-y-2">
            {expenses.slice(-5).reverse().map((expense, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <span className="font-medium">{expense.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({expense.category})</span>
                </div>
                <span className="font-bold text-red-600">${expense.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseManager;
```

### Chatbot Integration

```jsx
import React, { useState } from 'react';
import ChatForm from './components/ChatBot/ChatForm';
import axios from 'axios';

const FinancialChatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const generateBotResponse = async (conversation) => {
    try {
      const response = await axios.post('http://localhost:5000/api/gpt/advice', {
        prompt: conversation
      }, {
        withCredentials: true
      });

      // Remove "Thinking..." message and add bot response
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove thinking message
        { role: 'assistant', text: response.data.reply }
      ]);
    } catch (error) {
      console.error('Bot response failed:', error);
      
      // Remove "Thinking..." and show error
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }
      ]);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-semibold">Financial Assistant</h3>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="text-blue-200 hover:text-white text-sm"
              >
                Clear
              </button>
              <button
                onClick={toggleChat}
                className="text-blue-200 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                Ask me anything about your finances!
              </div>
            )}
            
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.role === 'system'
                      ? 'bg-gray-100 text-gray-600 italic'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FinancialChatbot;
```

## Full Application Integration Example

### Complete App with All Features

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppContextProvider from './context/AppContext';
import App from './App';
import FinancialChatbot from './components/FinancialChatbot';

// Main application wrapper with all providers and features
const FinSavvyApp = () => {
  return (
    <Router>
      <AppContextProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Main App Content */}
          <App />
          
          {/* Global Chatbot */}
          <FinancialChatbot />
          
          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </AppContextProvider>
    </Router>
  );
};

export default FinSavvyApp;
```

### Custom Hooks for API Integration

```jsx
// hooks/useAuth.js
import { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';

export const useAuth = () => {
  const { isLoggedin, setIsLoggedin, userData, setUserData, backendUrl } = useContext(AppContent);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      if (response.data.success) {
        setIsLoggedin(true);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      setIsLoggedin(false);
      setUserData(null);
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { isLoggedin, userData, login, logout, loading };
};

// hooks/useTransactions.js
import { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';

export const useTransactions = () => {
  const { backendUrl } = useContext(AppContent);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/api/transactions`, {
        withCredentials: true
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post(`${backendUrl}/api/transactions/manual-expenses`, 
        transactionData, 
        { withCredentials: true }
      );
      
      setTransactions(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to add transaction' 
      };
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`${backendUrl}/api/transactions/${transactionId}`, {
        withCredentials: true
      });
      
      setTransactions(prev => prev.filter(t => t._id !== transactionId));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to delete transaction' 
      };
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction
  };
};
```

## Testing Examples

### API Testing with Jest

```javascript
// __tests__/api.test.js
const request = require('supertest');
const app = require('../server/app');

describe('Authentication API', () => {
  test('POST /api/auth/register - should register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /api/auth/login - should login with valid credentials', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe('Transaction API', () => {
  let authCookie;

  beforeAll(async () => {
    // Login to get auth cookie
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    authCookie = loginResponse.headers['set-cookie'];
  });

  test('POST /api/transactions/manual-expenses - should add expense', async () => {
    const expenseData = {
      name: 'Test Expense',
      amount: 50.00,
      category: 'Food',
      date: '2024-01-15'
    };

    const response = await request(app)
      .post('/api/transactions/manual-expenses')
      .set('Cookie', authCookie)
      .send(expenseData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Expense');
  });
});
```

### React Component Testing

```jsx
// __tests__/TransactionTable.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionTable from '../src/components/Dashboard/TransactionTable';

const mockTransactions = [
  {
    _id: '1',
    name: 'Test Transaction',
    amount: 50.00,
    category: 'Food',
    date: '2024-01-15T00:00:00.000Z',
    type: 'expense'
  }
];

const mockOnDelete = jest.fn();

describe('TransactionTable', () => {
  test('renders transactions correctly', () => {
    render(
      <TransactionTable 
        transactions={mockTransactions} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Transaction')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  test('calls onDelete when delete button clicked', async () => {
    render(
      <TransactionTable 
        transactions={mockTransactions} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByText('🗑️');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });
  });

  test('shows empty state when no transactions', () => {
    render(
      <TransactionTable 
        transactions={[]} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('No transactions found matching your filters.')).toBeInTheDocument();
  });
});
```

This comprehensive usage guide provides practical examples for integrating with FinSavvy's APIs and components. Each example includes error handling, best practices, and real-world usage patterns that developers can adapt for their specific needs.