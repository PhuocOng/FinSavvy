import { ShoppingCart } from 'lucide-react';

const TransactionTable = ({ transactions }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center gap-2 mb-4">
      <ShoppingCart className="w-5 h-5 text-blue-600" />
      <h2 className="text-xl font-semibold text-blue-900">
        Recent Transactions ({transactions.length})
      </h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-blue-100">
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Name</th>
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Date</th>
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Amount</th>
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-b border-blue-50 hover:bg-blue-25 transition-colors">
              <td className="py-3 px-4 text-blue-800">{txn.name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</td>
              <td className="py-3 px-4 text-blue-800">
                {new Date(txn.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </td>
              <td className="py-3 px-4 text-blue-800">${txn.amount.toFixed(2)}</td>
              <td className="py-3 px-4 text-blue-800">{txn.category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {transactions.length === 0 && (
      <div className="text-center py-8 text-blue-500">
        No transactions found matching your filters.
      </div>
    )}
  </div>
);

export default TransactionTable;