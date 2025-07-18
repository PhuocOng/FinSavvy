import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

const BarChart = ({ data }) => {
  const barChartData = useMemo(() => {
    const monthlyData = {};
    data.forEach(transaction => {
      const month = transaction.date.substring(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expenses: 0 };
      }
      if (transaction.type === 'income') {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expenses += transaction.amount;
      }
    });
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Monthly Income vs Expenses</h3>
      {barChartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ReBarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, '']} />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-8 text-blue-500">
          No monthly data to display.
        </div>
      )}
    </div>
  );
};

export default BarChart;