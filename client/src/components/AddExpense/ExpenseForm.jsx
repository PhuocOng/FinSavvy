import React from 'react';
import DatePicker from 'react-datepicker';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

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
    <div className="bg-white w-full max-w-sm mx-auto h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex gap-4 mb-6">
        <button onClick={onBack} className="text-xl text-gray-700 hover:text-black">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Add Expense</h2>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">Description</label>
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="yyyy-MM-dd"
            customInput={
              <button
                type="button"
                className="w-full px-4 py-2 border rounded-md text-left bg-white hover:bg-gray-50"
              >
                {date.toISOString().slice(0, 10)}
              </button>
            }
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        disabled={!name || !category}
        className={`w-full mt-6 py-3 rounded-full text-white font-semibold text-base transition ${
          name && category
            ? 'bg-blue-50 hover: bg-blue-100 '
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Review
      </button>
    </div>
  );
};

export default ExpenseForm;
