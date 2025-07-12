import { useEffect, useState } from 'react';
import { PieChart as RePieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { getCategorySummary } from '../services/analytics';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28', '#FF8042', '#8dd1e1'];

export default function PieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategorySummary()
      .then(res => setData(res))
      .catch(err => console.error("Error fetching category summary:", err));
  }, []);

  return (
    <div className="p-4 shadow rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Spending by Category</h2>

      {Array.isArray(data) && data.length > 0 ? (
        <RePieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="totalAmount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
