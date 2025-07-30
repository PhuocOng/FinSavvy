# FinSavvy React Components Documentation

## Overview

FinSavvy frontend is built with React 19.1.0 and uses modern React patterns including hooks, context API, and functional components. The application uses Vite as the build tool and Tailwind CSS for styling.

## Project Structure

```
client/src/
├── components/
│   ├── AddExpense/          # Expense creation workflow
│   ├── ChatBot/             # AI chatbot functionality
│   ├── Dashboard/           # Dashboard visualization components
│   └── Navbar/              # Navigation components
├── context/                 # React Context for global state
├── pages/                   # Page-level components
├── assets/                  # Static assets
└── __tests__/               # Test files
```

## Global Context

### AppContext

The main application context that manages global state.

**Location:** `./src/context/AppContext.jsx`

**Provides:**
- `backendUrl`: Backend API base URL
- `isLoggedin`: Boolean indicating user authentication status
- `setIsLoggedin`: Function to update login status
- `userData`: Current user's profile data
- `setUserData`: Function to update user data
- `getUserData`: Function to fetch user data from API
- `isLoading`: Boolean indicating app loading state
- `setIsLoading`: Function to update loading state

**Usage:**
```jsx
import { useContext } from 'react';
import { AppContent } from './context/AppContext';

const MyComponent = () => {
  const { userData, isLoggedin, backendUrl } = useContext(AppContent);
  
  if (!isLoggedin) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {userData.name}!</div>;
};
```

## Navigation Components

### Navbar

Main navigation bar for authenticated users.

**Location:** `./src/components/Navbar/Navbar.jsx`

**Props:** None (uses context)

**Features:**
- Logo and branding
- Navigation links (Home, Dashboard, Settings)
- Search bar
- User profile dropdown with logout functionality
- Responsive design

**Dependencies:**
- `AppContent` context
- `react-router-dom` for navigation
- `axios` for API calls
- `react-toastify` for notifications

**Usage:**
```jsx
import Navbar from './components/Navbar/Navbar';

// Automatically includes all navigation functionality
<Navbar />
```

**Styling:**
- Uses Tailwind CSS classes
- Gradient background from blue-50 to blue-100
- Hover effects on navigation items
- Profile avatar with first letter of user's name

### PublicNavbar

Navigation bar for non-authenticated users (referenced but not detailed in provided code).

**Location:** `./src/components/Navbar/PublicNavbar.jsx`

## Dashboard Components

### TransactionTable

Displays user transactions in a table format with filtering and deletion capabilities.

**Location:** `./src/components/Dashboard/TransactionTable.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `transactions` | Array | Yes | Array of transaction objects |
| `onDelete` | Function | Yes | Callback function for deleting transactions |

**Transaction Object Structure:**
```javascript
{
  _id: string,           // Unique transaction ID
  name: string,          // Transaction name
  date: string,          // ISO date string
  amount: number,        // Transaction amount
  category: string,      // Transaction category
  type: string          // 'income' or 'expense'
}
```

**Features:**
- Responsive table design
- Name formatting (removes underscores, proper capitalization)
- Date formatting (YYYY-MM-DD)
- Amount formatting (currency display)
- Category formatting
- Delete button with confirmation
- Empty state message

**Usage:**
```jsx
import TransactionTable from './components/Dashboard/TransactionTable';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  
  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`);
      setTransactions(prev => prev.filter(t => t._id !== transactionId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };
  
  return (
    <TransactionTable 
      transactions={transactions} 
      onDelete={handleDelete} 
    />
  );
};
```

### PieChart

Visualizes expense distribution by category using Recharts.

**Location:** `./src/components/Dashboard/PieChart.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | Array | Yes | Array of transaction objects |

**Features:**
- Automatically groups expenses by category
- Displays percentages and amounts
- Uses predefined color scheme
- Responsive container
- Tooltip with formatted amounts
- Empty state handling

**Color Scheme:**
```javascript
const COLORS = ['#3B82F6', '#1E40AF', '#60A5FA', '#93C5FD', '#DBEAFE', '#EFF6FF'];
```

**Usage:**
```jsx
import PieChart from './components/Dashboard/PieChart';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  
  return (
    <PieChart data={transactions} />
  );
};
```

**Data Processing:**
- Filters transactions with valid categories
- Sums amounts by category
- Creates formatted data for Recharts

### BarChart

Displays monthly income vs expenses comparison using Recharts.

**Location:** `./src/components/Dashboard/BarChart.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | Array | Yes | Array of transaction objects |

**Features:**
- Groups transactions by month (YYYY-MM format)
- Separates income and expenses
- Color-coded bars (green for income, red for expenses)
- Responsive design
- Tooltip with currency formatting
- Legend for clarity

**Usage:**
```jsx
import BarChart from './components/Dashboard/BarChart';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  
  return (
    <BarChart data={transactions} />
  );
};
```

**Chart Configuration:**
- Income bars: `#10B981` (green)
- Expense bars: `#EF4444` (red)
- Rounded bar corners
- Grid lines for readability

### FilterByCategory

Category filter dropdown component.

**Location:** `./src/components/Dashboard/FilterByCategory.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `categoryFilter` | string | Yes | Current selected category |
| `setCategoryFilter` | Function | Yes | Function to update category filter |
| `categories` | Array | Yes | Array of available categories |

**Features:**
- Dropdown select element
- "Categories" default option
- Automatic text formatting (removes underscores, proper capitalization)
- Tailwind CSS styling with focus states

**Usage:**
```jsx
import FilterByCategory from './components/Dashboard/FilterByCategory';

const Dashboard = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const categories = ['Food', 'Transportation', 'Shopping', 'Entertainment'];
  
  return (
    <FilterByCategory 
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      categories={categories}
    />
  );
};
```

### FilterByDate

Date filter component (referenced but not detailed in provided code).

**Location:** `./src/components/Dashboard/FilterByDate.jsx`

## Add Expense Components

### AddExpenseForm

Multi-step form for adding new expenses with a wizard-like interface.

**Location:** `./src/components/AddExpense/AddExpenseForm.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onAdd` | Function | Yes | Callback function when expense is added |
| `categoryOptions` | Array | Yes | Available expense categories |
| `onClose` | Function | Yes | Callback function to close the form |

**State Management:**
- `step`: Current form step (1-3)
- `amount`: Expense amount
- `name`: Expense name/description
- `category`: Selected category
- `date`: Expense date
- `confirmed`: Success confirmation state

**Form Steps:**
1. **Amount Entry** - User enters expense amount
2. **Expense Details** - Name, category, and date selection
3. **Confirmation** - Review and submit

**Features:**
- Multi-step wizard interface
- Form validation
- API integration for expense creation
- Success confirmation
- Edit functionality (jump back to specific steps)
- Form reset after submission

**Usage:**
```jsx
import AddExpenseForm from './components/AddExpense/AddExpenseForm';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const categoryOptions = ['Food', 'Transportation', 'Shopping'];
  
  const handleAddExpense = (newExpense) => {
    setExpenses(prev => [...prev, newExpense]);
  };
  
  const handleClose = () => {
    // Close modal or navigate away
  };
  
  return (
    <AddExpenseForm 
      onAdd={handleAddExpense}
      categoryOptions={categoryOptions}
      onClose={handleClose}
    />
  );
};
```

**API Integration:**
- Submits to `/api/transactions/manual-expenses`
- Includes authentication cookies
- Formats date as ISO string

### AmountEntry

Step 1 of the expense form - amount input.

**Location:** `./src/components/AddExpense/AmountEntry.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | string | Yes | Current amount value |
| `setAmount` | Function | Yes | Function to update amount |
| `onNext` | Function | Yes | Callback to proceed to next step |
| `onBack` | Function | Yes | Callback to go back/cancel |

### ExpenseForm

Step 2 of the expense form - details input.

**Location:** `./src/components/AddExpense/ExpenseForm.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Expense name |
| `setName` | Function | Yes | Function to update name |
| `category` | string | Yes | Selected category |
| `setCategory` | Function | Yes | Function to update category |
| `date` | Date | Yes | Expense date |
| `setDate` | Function | Yes | Function to update date |
| `categoryOptions` | Array | Yes | Available categories |
| `onNext` | Function | Yes | Callback to proceed |
| `onBack` | Function | Yes | Callback to go back |

### ConfirmExpense

Step 3 of the expense form - confirmation and submission.

**Location:** `./src/components/AddExpense/ConfirmExpense.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Expense name |
| `setName` | Function | Yes | Name setter (for inline editing) |
| `amount` | string | Yes | Expense amount |
| `setAmount` | Function | Yes | Amount setter (for inline editing) |
| `category` | string | Yes | Expense category |
| `setCategory` | Function | Yes | Category setter (for inline editing) |
| `date` | Date | Yes | Expense date |
| `setDate` | Function | Yes | Date setter (for inline editing) |
| `onBack` | Function | Yes | Callback to go back |
| `onSubmit` | Function | Yes | Callback to submit form |
| `onEdit` | Function | Yes | Callback to edit specific fields |

## Chatbot Components

### ChatForm

Form component for user input in the AI chatbot.

**Location:** `./src/components/ChatBot/ChatForm.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `chatHistory` | Array | Yes | Current chat conversation |
| `setChatHistory` | Function | Yes | Function to update chat history |
| `generateBotResponse` | Function | Yes | Function to generate AI response |

**Features:**
- Text input with placeholder
- Form submission handling
- Automatic input clearing
- Chat history updating
- "Thinking..." placeholder
- 600ms delay before response generation

**Usage:**
```jsx
import ChatForm from './components/ChatBot/ChatForm';

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  
  const generateBotResponse = async (conversation) => {
    try {
      const response = await axios.post('/api/gpt/advice', {
        prompt: conversation
      });
      
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove "Thinking..." message
        { role: 'assistant', text: response.data.reply }
      ]);
    } catch (error) {
      console.error('Bot response failed:', error);
    }
  };
  
  return (
    <ChatForm 
      chatHistory={chatHistory}
      setChatHistory={setChatHistory}
      generateBotResponse={generateBotResponse}
    />
  );
};
```

**Chat History Structure:**
```javascript
[
  { role: 'user', text: 'User message' },
  { role: 'assistant', text: 'Bot response' },
  { role: 'system', text: 'Thinking...' }
]
```

### ChatMessage

Individual chat message component (referenced but not detailed in provided code).

**Location:** `./src/components/ChatBot/ChatMessage.jsx`

### Chatboticon

Chatbot icon/button component (referenced but not detailed in provided code).

**Location:** `./src/components/ChatBot/Chatboticon.jsx`

## Other Components

### Footer

Application footer component.

**Location:** `./src/components/Footer.jsx`

## Main Application Component

### App

Root application component with routing and authentication logic.

**Location:** `./src/App.jsx`

**Features:**
- React Router setup
- Authentication-based routing
- Loading state management
- Toast notifications
- Conditional navbar rendering
- Protected routes

**Routes:**
- `/` - Homepage (authenticated) or Landing Page (public)
- `/login` - Login page (public only)
- `/email-verify` - Email verification
- `/reset-password` - Password reset
- `/dashboard` - Dashboard (authenticated only)

**Usage:**
```jsx
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext';
import App from './App';

const AppWrapper = () => (
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
```

## Styling Guidelines

### Tailwind CSS Classes

The application uses a consistent color scheme and styling patterns:

**Primary Colors:**
- Blue variants: `blue-50`, `blue-100`, `blue-500`, `blue-600`, `blue-700`, `blue-800`, `blue-900`
- Additional colors: Green (`#10B981`), Red (`#EF4444`)

**Common Patterns:**
- Cards: `bg-white rounded-xl shadow-lg p-6`
- Buttons: `p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all`
- Inputs: `border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`

### Responsive Design

Components use responsive Tailwind classes:
- `md:flex`, `md:px-32` for medium screens and up
- `hidden md:flex` for desktop-only elements
- Responsive containers for charts

## Best Practices

### Component Design
1. **Functional Components:** All components use modern functional component syntax
2. **Hooks:** Proper use of `useState`, `useEffect`, `useContext`, `useMemo`, `useRef`
3. **Props Validation:** Clear prop interfaces (consider adding PropTypes)
4. **Error Handling:** Try-catch blocks for API calls
5. **Loading States:** Proper loading state management

### State Management
1. **Context API:** Global state through AppContext
2. **Local State:** Component-specific state with useState
3. **Derived State:** useMemo for computed values
4. **Form State:** Controlled components with state

### Performance
1. **Memoization:** useMemo for expensive calculations
2. **Conditional Rendering:** Efficient conditional logic
3. **Code Splitting:** Potential for lazy loading (not currently implemented)

## Dependencies

### Core Dependencies
- **React:** 19.1.0 - Core library
- **React Router DOM:** 7.6.3 - Client-side routing
- **Axios:** 1.10.0 - HTTP client
- **React Toastify:** 11.0.5 - Notifications

### UI/Styling
- **Tailwind CSS:** 4.1.11 - Utility-first CSS
- **Lucide React:** 0.525.0 - Icons
- **React Icons:** 5.5.0 - Additional icons
- **Framer Motion:** 12.23.6 - Animations

### Charts/Data Visualization
- **Recharts:** 3.1.0 - Chart library

### Specific Features
- **React Datepicker:** 8.4.0 - Date selection
- **React Chatbot Kit:** 2.2.2 - Chatbot functionality

## Testing

Test files are located in `./src/__tests__/` directory. The project uses Jest for testing.

**Available Tests:**
- `App.test.js` - Main application tests

**Running Tests:**
```bash
npm test
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview

# Run tests
npm test
```

## Environment Variables

The frontend uses environment variables for configuration:

- `VITE_BACKEND_URL` - Backend API base URL

Example `.env` file:
```env
VITE_BACKEND_URL=http://localhost:5000
```