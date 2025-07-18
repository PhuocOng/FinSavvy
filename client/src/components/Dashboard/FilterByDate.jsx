import React from 'react';

const FilterByDate = ({ setDateFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">From:</label>
      <input
        type="date"
        name="from"
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label className="text-sm font-medium">To:</label>
      <input
        type="date"
        name="to"
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default FilterByDate;
