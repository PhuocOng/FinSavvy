import React from 'react';
import { Calendar } from 'lucide-react';

const FilterByDate = ({ dateFilter, setDateFilter }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-blue-700 mb-2">Date From</label>
      <div className="relative">
        <Calendar className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default FilterByDate;