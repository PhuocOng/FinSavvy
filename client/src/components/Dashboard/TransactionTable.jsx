// TransactionTable
import React from 'react';

const TransactionTable = ({ transactions }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2 text-left">Name</th>
        <th className="border px-4 py-2 text-left">Date</th>
        <th className="border px-4 py-2 text-left">Amount ($)</th>
        <th className="border px-4 py-2 text-left">Category</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(txn => (
        <tr key={txn.id} className="hover:bg-gray-50">
          <td className="border px-4 py-2">{txn.name}</td>
          <td className="border px-4 py-2">{txn.date}</td>
          <td className="border px-4 py-2">${txn.amount.toFixed(2)}</td>
          <td className="border px-4 py-2">{txn.category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionTable;
