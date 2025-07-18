import React from 'react';

const FilterByCategory = ({ categoryFilter, setCategoryFilter, categories }) => (
  <div>
    <label className="block text-sm font-medium text-blue-700 mb-2">Category</label>
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  </div>
);

export default FilterByCategory;