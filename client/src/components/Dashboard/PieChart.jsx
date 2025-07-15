import { useEffect, useState } from 'react';
import { PieChart as RePieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import { getCategorySummary } from '../../services/analytics';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28', '#FF8042', '#8dd1e1'];

export default function PieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategorySummary()
      .then(res => setData(res))
      .catch(err => console.error("Error fetching category summary:", err));
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>

      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <RePieChart>
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
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </RePieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No data available for categories.</p>
      )}
    </div>
  );
}
