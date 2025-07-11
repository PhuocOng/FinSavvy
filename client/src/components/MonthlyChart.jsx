import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MonthlyChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="totalAmount" stroke="#82ca9d" />
    </LineChart>
  );
};

export default MonthlyChart;
