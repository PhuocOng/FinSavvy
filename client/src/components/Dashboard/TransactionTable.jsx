import { ShoppingCart } from 'lucide-react';

const TransactionTable = ({ transactions, onDelete }) => (
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
            <th className="text-left py-3 px-4 text-gray-700 font-semibold">Name</th>
            <th className="text-center py-3 px-4 text-gray-700 font-semibold">Date</th>
            <th className="text-center py-3 px-4 text-gray-700 font-semibold">Amount</th>
            <th className="text-center py-3 px-4 text-gray-700 font-semibold">Category</th>
            <th className="text-center py-3 px-4 text-gray-700 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id} className="border-b border-blue-50 hover:bg-blue-25 transition-colors">
              <td className="py-3 px-4 text-gray-800">{txn.name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</td>
              <td className="py-3 px-4 text-gray-800">
                {new Date(txn.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </td>
              <td className="py-3 px-4 text-gray-800 text-center">${txn.amount.toFixed(2)}</td>
              <td className="py-3 px-4 text-grey-800 text-center">{txn.category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</td>
              <td className="py-3 px-4 text-red-600 cursor-pointer text-center"><button onClick={() => onDelete(txn._id)}>🗑️</button></td>
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