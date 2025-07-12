// Dashboard.jsx
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* 📝 TODO: Filters Section */}
      {/* <FilterByCategory /> */}
      {/* <FilterByDate /> */}

      {/* 📝 TODO: Transactions Table */}
      {/* <TransactionTable /> */}

      {/* 🧠 Analytics Charts - Trung's Part */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4">
          <PieChart />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
