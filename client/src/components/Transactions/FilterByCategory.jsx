// FilterByCategory

const FilterByCategory = ({ setCategoryFilter, categories }) => (
    <select
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
        {cat.replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase())}
      </option>      
      ))}
    </select>
  );

export default FilterByCategory;
