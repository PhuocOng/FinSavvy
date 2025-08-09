import React from 'react';
import DatePicker from 'react-datepicker';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import './AddExpense.css';

const ExpenseForm = ({
  name,
  setName,
  category,
  setCategory,
  date,
  setDate,
  categoryOptions,
  onNext,
  onBack
}) => {
  return (
    <div className="expense-form-container">
      {/* Header */}
      <div className="expense-form-header">
        <button onClick={onBack} className="back-button">
          <FaArrowLeft />
        </button>
        <h2 className="expense-form-title">Add Expense</h2>
      </div>

      {/* Inputs */}
      <div className="expense-form-body">
        {/* Name Input */}
        <div className="expense-form-name">
          <label className="expense-form-label">Description</label>
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="expense-form-input"
            required
          />
        </div>

        {/* Date Picker */}
        <div className="expense-form-date">
          <label className="expense-form-date-label">Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="yyyy-MM-dd"
            customInput={
              <button
                type="button"
                className="expense-form-date-button"
              >
                {date.toISOString().slice(0, 10)}
              </button>
            }
          />
        </div>

        {/* Category Dropdown */}
        <div className="expense-form-category">
          <label className="expense-form-category-label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="expense-form-category-select"
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
      </div>

      {/* Review Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!name || !date}
        className={`expense-form-review-button ${name && date ? 'enabled' : 'disabled'}`}
      >
        Review
      </button>
    </div>
  );
};

export default ExpenseForm;
