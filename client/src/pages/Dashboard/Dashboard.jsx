import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Filter, TrendingUp, DollarSign, CreditCard, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import TransactionTable from '../../components/Dashboard/TransactionTable';
import PieChart from '../../components/Dashboard/PieChart';
import BarChart from '../../components/Dashboard/BarChart';
import FilterByDate from '../../components/Dashboard/FilterByDate';
import FilterByCategory from '../../components/Dashboard/FilterByCategory';
import './Dashboard.css'; // Import the stylesheet

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    axios.get('/api/transactions')
      .then(res => {
        const processedTransactions = res.data.transactions.map(t => ({
          id: t.transaction_id,
          date: t.date,
          category: t.category,
          amount: t.amount,
          type: t.amount >= 0 ? 'expense' : 'income',
          description: t.name,
        }));
        setTransactions(processedTransactions);
      })
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  const categories = useMemo(() => [...new Set(transactions.map(t => t.category))], [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesDate = !dateFilter || new Date(transaction.date) >= new Date(dateFilter);
      const matchesCategory = !categoryFilter || transaction.category === categoryFilter;
      const matchesType = !typeFilter || transaction.type === typeFilter;
      return matchesDate && matchesCategory && matchesType;
    });
  }, [transactions, dateFilter, categoryFilter, typeFilter]);

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
            <FilterByDate dateFilter={dateFilter} setDateFilter={setDateFilter} />
            <FilterByCategory categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} categories={categories} />
            <div>
              <label className="filter-label">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div className="filters-actions">
            <button
              onClick={() => {
                setDateFilter('');
                setCategoryFilter('');
                setTypeFilter('');
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