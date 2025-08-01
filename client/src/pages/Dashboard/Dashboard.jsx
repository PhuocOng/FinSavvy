import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Filter, TrendingUp, DollarSign, CreditCard, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import TransactionTable from '../../components/Dashboard/TransactionTable';
import PieChart from '../../components/Dashboard/PieChart';
import BarChart from '../../components/Dashboard/BarChart';
import FilterByDate from '../../components/Dashboard/FilterByDate';
import FilterByCategory from '../../components/Dashboard/FilterByCategory';
import './Dashboard.css'; // Import the stylesheet
// import { use } from '../../../../server/config/nodemailer';
import ChatBot from '../ChatBot/ChatBot';
import AddExpenseForm from '../../components/AddExpense/AddExpenseForm';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); //Take all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]); //Filtered list
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: ''});
  const handleAddManualExpense = (newExpense) => {
    setTransactions(prev => [...prev, newExpense]);
  };
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`, { withCredentials: true })
      .then(res => {
        const txns = res.data.transactions;
        setTransactions(txns); //save full list
        setFilteredTransactions(txns)

        // const categories = Array.from(new Set(txns.map(txn => txn.category))).sort();
        // setCategoryOptions(categories) //show all list at first

        const categories = [
          'Food', 'Transportation', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Others'
        ];
        setCategoryOptions(categories);
      })
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  useEffect(() => {
    let result = [...transactions];

    // Filter by category
    if (categoryFilter) {
      result = result.filter(txn => txn.category === categoryFilter);
    }

    // Filter by date range
    if (dateFilter.from && dateFilter.to) {
      result = result.filter(txn => {
        const txnDate = new Date(txn.date);
        return txnDate >= new Date(dateFilter.from) && txnDate <= new Date(dateFilter.to);
      });
    }

    setFilteredTransactions(result); //update table
  }, [categoryFilter, dateFilter, transactions]);

  const totalIncome = useMemo(() => filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [filteredTransactions]);
  const totalExpenses = useMemo(() => filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [filteredTransactions]);
  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Transaction Dashboard</h1>
          <p className="dashboard-subtitle">Visualize your spendings and stay on top of your finances</p>
        </div>

        {/* Filters */}
        <div className="filters-grid-horizontal">
          <FilterByDate 
            dateFilter={dateFilter}
            setDateFilter={setDateFilter} 
          />
          <FilterByCategory
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter} 
            categories={categoryOptions}
          />
            <button
              onClick={() => {
                setDateFilter({ from: '', to: '' });
                setCategoryFilter('');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
            {/* Add expense */}
            <button
              onClick={() => setShowAddForm(prev => !prev)}
              className="add-expense-btn"
            >
              + Add Expense
            </button>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <PieChart data={filteredTransactions} />
          <BarChart data={filteredTransactions} />
        </div>

        {/* Transaction Table */}
        <TransactionTable transactions={filteredTransactions}
          onDelete={(id) => {
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${id}`, {
              withCredentials: true
            })
            .then(() => {
              const updated = transactions.filter(t => t._id !== id);
              setTransactions(updated);
            })
            .catch(err => {
              console.error('Error deleting transaction:', err);
            });
          }}
        />

        <ChatBot />

           {/* Add Expense Slide-In Right Panel */}
            {showAddForm && (
  <>
    {/* Background Overlay */}
    <div
      className="overlay"
      onClick={() => setShowAddForm(false)}
    />

    <div className="add-expense-panel show">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>
      </div>

      {/* Scrollable form area */}
      <div className="add-expense-form">
        <AddExpenseForm
          onClose={() => setShowAddForm(false)}
          onAdd={(expense) => {
            handleAddManualExpense(expense);
            setShowAddForm(false);
          }}
          categoryOptions={categoryOptions}
        />
      </div>
    </div>

  </>
)}

      </div>
    </div>
  );
};

export default Dashboard;