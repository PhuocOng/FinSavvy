import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';

const AnalyticsPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token'); // or however you store it

        const [catRes, monRes] = await Promise.all([
          axios.get('/api/analytics/category-summary', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/analytics/monthly-summary', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCategoryData(catRes.data);
        setMonthlyData(monRes.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>Spending by Category</h2>
      <CategoryChart data={categoryData} />

      <h2>Monthly Spending Trend</h2>
      <MonthlyChart data={monthlyData} />
    </div>
  );
};

export default AnalyticsPage;
