import { ShoppingCart } from "lucide-react";

const TransactionTable = ({ transactions, onDelete }) => (
  <div className="transaction-table-container">
    <div className="transaction-table-header">
      <ShoppingCart className="transaction-table-icon" />
      <h2 className="transaction-table-title">
        Recent Transactions ({transactions.length})
      </h2>
    </div>
    <div className="transaction-table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr className="transaction-table-header-row">
            <th className="transaction-table-th">Name</th>
            <th className="transaction-table-th">Date</th>
            <th className="transaction-table-th">Amount</th>
            <th className="transaction-table-th">Category</th>
            <th className="transaction-table-th">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id} className="transaction-table-row">
              <td className="transaction-table-td">
                {txn.name
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </td>
              <td className="transaction-table-td">
                {new Date(txn.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="transaction-table-td transaction-table-amount">
                ${txn.amount.toFixed(2)}
              </td>
              <td className="transaction-table-td transaction-table-category">
                {txn.category
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </td>
              <td className="transaction-table-td transaction-table-action">
                <button
                  onClick={() => onDelete(txn._id)}
                  className="transaction-delete-btn"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {transactions.length === 0 && (
      <div className="transaction-table-empty">
        No transactions found matching your filters.
      </div>
    )}
  </div>
);

export default TransactionTable;
