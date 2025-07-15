import PieChart from '../components/Dashboard/PieChart';
import BarChart from '../components/Dashboard/BarChart';
import TransactionTable from '../components/Dashboard/TransactionTable';
import FilterByCategory from '../components/Dashboard/FilterByCategory';
import FilterByDate from '../components/Dashboard/FilterByDate';
import { useState, useEffect } from 'react';
import { fetchTransactionsWithFilters } from '../services/transactions';

function Dashboard() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = {
          ...(categoryFilter && { category: categoryFilter }),
          ...(dateFilter.from && { from: dateFilter.from }),
          ...(dateFilter.to && { to: dateFilter.to }),
        };

        const data = await fetchTransactionsWithFilters(filters);
        setTransactions(data);

        const uniqueCategories = [...new Set(data.map(t => t.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [categoryFilter, dateFilter]);

  return (
    <div className="p-4 pt-24 space-y-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">📊 Dashboard Overview</h1>

      {/* 🔍 Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex gap-4 flex-wrap items-center">
          <FilterByCategory categories={categories} setCategoryFilter={setCategoryFilter} />
          <FilterByDate setDateFilter={setDateFilter} />
        </div>
        <div className="text-sm text-gray-500">Filters apply to the transaction table only.</div>
      </div>

      {/* 📋 Transaction Table Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <TransactionTable transactions={transactions} />
        ) : (
          <p className="text-gray-500">No transactions found for current filters.</p>
        )}
      </div>

      {/* 📈 Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <PieChart />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
