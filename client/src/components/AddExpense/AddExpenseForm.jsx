import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = ({ onAdd, categoryOptions }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/manual-expenses`, {
        name,
        amount,
        category,
        date,
      }, { withCredentials: true });

      onAdd(res.data);
      setAmount('');
      setCategory('');
      setDate('');
    } catch (err) {
      console.error('Error adding manual expense:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-expense-form">

      {/* Expense name */}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="e.g. Grocery shopping, Rent"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Expense date */}
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Expense amount */}
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {/* Expense category */}
      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select a category --</option>
          {categoryOptions.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-expense-btn">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
