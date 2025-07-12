import { useEffect, useState } from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { getMonthlySummary } from '../services/analytics';

function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonthlySummary().then(setData);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Monthly Spending</h2>
      <ReBarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalAmount" fill="#8884d8" />
      </ReBarChart>
    </div>
  );
}

export default BarChart;
