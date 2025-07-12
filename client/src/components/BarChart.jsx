import { useEffect, useState } from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonthlySummary } from '../services/analytics';

export default function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonthlySummary()
      .then(res => setData(res))
      .catch(err => console.error("Error fetching monthly summary:", err));
  }, []);

  return (
    <div className="p-4 shadow rounded-lg bg-white mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Spending Overview</h2>

      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ReBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#8884d8" name="Total Spending" />
          </ReBarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
