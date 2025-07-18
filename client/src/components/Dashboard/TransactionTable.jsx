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
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Date</th>
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Category</th>
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Description</th>
            <th className="text-left py-3 px-4 text-blue-700 font-semibold">Type</th>
            <th className="text-right py-3 px-4 text-blue-700 font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-blue-50 hover:bg-blue-25 transition-colors">
              <td className="py-3 px-4 text-blue-800">{transaction.date}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {transaction.category}
                </span>
              </td>
              <td className="py-3 px-4 text-blue-700">{transaction.description}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type}
                </span>
              </td>
              <td className={`py-3 px-4 text-right font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </td>
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