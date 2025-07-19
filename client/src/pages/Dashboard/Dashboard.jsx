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

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); //Take all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]); //Filtered list
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: ''});

  useEffect(() => {
    axios.get('/api/transactions')
      .then(res => {
        const txns = res.data.transactions;
        setTransactions(txns); //save full list
        setFilteredTransactions(txns)

        const categories = Array.from(new Set(txns.map(txn => txn.category))).sort();
        setCategoryOptions(categories) //show all list at first
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
          <h1 className="dashboard-title">Financial Dashboard</h1>
          <p className="dashboard-subtitle">Track your income, expenses, and financial trends</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {/* Total Income */}
          <div className="stat-card income-card">
            <div className="stat-card-content">
              <div>
                <p className="stat-card-label">Total Income</p>
                <p className="stat-card-amount">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="stat-card-icon-wrapper income-icon-bg">
                <TrendingUp className="stat-card-icon income-icon-color" />
              </div>
            </div>
          </div>
          {/* Total Expenses */}
          <div className="stat-card expense-card">
            <div className="stat-card-content">
              <div>
                <p className="stat-card-label">Total Expenses</p>
                <p className="stat-card-amount">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="stat-card-icon-wrapper expense-icon-bg">
                <CreditCard className="stat-card-icon expense-icon-color" />
              </div>
            </div>
          </div>
          {/* Net Amount */}
          <div className="stat-card net-card">
            <div className="stat-card-content">
              <div>
                <p className="stat-card-label">Net Amount</p>
                <p className={`stat-card-amount ${netAmount >= 0 ? 'text-positive' : 'text-negative'}`}>
                  ${netAmount.toFixed(2)}
                </p>
              </div>
              <div className="stat-card-icon-wrapper net-icon-bg">
                <DollarSign className="stat-card-icon net-icon-color" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filters-header">
            <Filter className="filter-icon" />
            <h2 className="filters-title">Filters</h2>
          </div>
          <div className="filters-grid">
            <FilterByDate 
              dateFilter={dateFilter}
              setDateFilter={setDateFilter} 
            />
            <FilterByCategory
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter} 
              categories={categoryOptions} />
          </div>
          <div className="filters-actions">
            <button
              onClick={() => {
                setDateFilter({ from: '', to: '' });
                setCategoryFilter('');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <PieChart data={filteredTransactions} />
          <BarChart data={filteredTransactions} />
        </div>

        {/* Transaction Table */}
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;