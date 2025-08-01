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
import PlaidLink from '../../components/Dashboard/PlaidLink';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); //Take all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]); //Filtered list
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: ''});
  const [showAddForm, setShowAddForm] = useState(false);
  const [isBankLinked, setIsBankLinked] = useState(false);

  const fetchTransactions = () => {
    axios.get('/api/transactions', { withCredentials: true })
      .then(res => {
        const txns = res.data.transactions;
        setTransactions(txns);
        setFilteredTransactions(txns);
        const categories = Array.from(new Set(txns.map(txn => txn.category))).sort();
        setCategoryOptions(categories);
      })
      .catch(err => console.error('Error fetching transactions:', err));
  };

  // Fetch transactions on initial load and after a successful Plaid link
  useEffect(() => {
    fetchTransactions();
  }, [isBankLinked]); 

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

  const handleAddManualExpense = (newExpense) => {
    setTransactions(prev => [...prev, newExpense]);
  };

  const handleSuccessfulLink = async () => {
    try {
      alert("Bank account linked! Syncing transactions now...");

      const authToken = localStorage.getItem('token');
      
      // Call your new backend route to sync transactions
      await axios.post('/api/plaid/sync-transactions', {}, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

      alert("Sync complete!");

      // Now, trigger your existing function to fetch data from YOUR database
      // which will update the UI. We use setIsBankLinked to do this.
      setIsBankLinked(prev => !prev);
      
    } catch (error) {
      console.error("Failed to sync transactions", error);
      alert("Could not sync transactions.");
    }
  };

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
            <PlaidLink onLinkSuccess={handleSuccessfulLink} />
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <PieChart data={filteredTransactions} />
          <BarChart data={filteredTransactions} />
        </div>

        {/* Transaction Table */}
        <TransactionTable transactions={filteredTransactions} />
        <ChatBot />

        {showAddForm && (
          // Modal overlay: darken the background and center the form
          <div className="modal-overlay"> 
            <div className="modal-box">
              <div className="modal-header">
                <h2>Add Expense</h2>
                <button onClick={() => setShowAddForm(false)} className="close-btn">✕</button>
              </div>
              <AddExpenseForm
                onAdd={(expense) => {
                  handleAddManualExpense(expense);
                  setShowAddForm(false); // Close modal after submit
                }}
                categoryOptions={categoryOptions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;