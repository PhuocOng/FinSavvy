import React from "react";

const FilterByDate = ({ dateFilter, setDateFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-date-container">
      <label className="filter-date-label">Date From:</label>
      <input
        type="date"
        name="from"
        value={dateFilter.from || ""}
        onChange={handleChange}
        className="filter-date-input"
      />
      <label className="filter-date-label">Date To:</label>
      <input
        type="date"
        name="to"
        value={dateFilter.to || ""}
        onChange={handleChange}
        className="filter-date-input"
      />
    </div>
  );
};

export default FilterByDate;
