import { useEffect, useState } from 'react';
import { PieChart as RePieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { getCategorySummary } from '../services/analytics';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28', '#FF8042', '#8dd1e1'];

function PieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategorySummary().then(setData);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Spending by Category</h2>
      <RePieChart width={400} height={400}>
        <Pie data={data} dataKey="totalAmount" nameKey="_id" cx="50%" cy="50%" outerRadius={100}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
}

export default PieChart;
