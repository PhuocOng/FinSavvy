// Dashboard
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionTable from '../components/Transactions/TransactionTable';
import FilterByCategory from '../components/Transactions/FilterByCategory';
import FilterByDate from '../components/Transactions/FilterByDate';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); // All transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Filtered list
  const [categoryOptions, setCategoryOptions] = useState([]); // all unique categories
  const [categoryFilter, setCategoryFilter] = useState('');   // selected category
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' }); // Selected date range

  // 1️⃣ Fetch transactions from backend
  useEffect(() => {
    axios.get('/api/transaction')
      .then(res => {
        const txns = res.data.transactions;
        setTransactions(txns); // save full list
        setFilteredTransactions(txns)
        
        const categories = Array.from(new Set(txns.map(txn => txn.category))).sort();
        setCategoryOptions(categories) // show all at first
      })
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  // 2️⃣ Apply filters when category/date changes
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

    setFilteredTransactions(result); // update table
  }, [categoryFilter, dateFilter, transactions]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>

      {/* 3️⃣ Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <FilterByCategory
          setCategoryFilter = {setCategoryFilter} 
          categories={categoryOptions}
        />
        <FilterByDate setDateFilter={setDateFilter} />
      </div>

      {/* 4️⃣ Transaction table */}
      <TransactionTable transactions={filteredTransactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4">
          <PieChart />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
