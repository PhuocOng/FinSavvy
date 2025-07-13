// FilterByDate.jsx
import React from 'react';

const FilterByDate = ({ setDateFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">From:</label>
      <input type="date" name="from" onChange={handleChange} className="border p-1 rounded" />
      <label className="text-sm">To:</label>
      <input type="date" name="to" onChange={handleChange} className="border p-1 rounded" />
    </div>
  );
};

export default FilterByDate;
