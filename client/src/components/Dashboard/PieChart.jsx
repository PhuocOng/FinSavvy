import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

const COLORS = ['#3B82F6', '#1E40AF', '#60A5FA', '#93C5FD', '#DBEAFE', '#EFF6FF'];

const PieChart = ({ data }) => {
  const pieChartData = useMemo(() => {
    const categoryTotals = {};
    data
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
      });
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Expenses by Category</h3>
      {pieChartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <RePieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
          </RePieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-8 text-blue-500">
          No expense data to display.
        </div>
      )}
    </div>
  );
};

export default PieChart;