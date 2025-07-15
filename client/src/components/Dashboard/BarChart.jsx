import { useEffect, useState } from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonthlySummary } from '../../services/analytics';

export default function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonthlySummary()
      .then(res => setData(res))
      .catch(err => console.error("Error fetching monthly summary:", err));
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold mb-4">Monthly Spending Overview</h2>

      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ReBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#4f46e5" name="Total Spending" />
          </ReBarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No monthly data available.</p>
      )}
    </div>
  );
}
