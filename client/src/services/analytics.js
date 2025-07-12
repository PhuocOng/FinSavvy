import axios from 'axios';

// fetch category summary from backend
export const getCategorySummary = async () => {
  const res = await axios.get('/api/analytics/category-summary');
  return res.data;
};

export const getMonthlySummary = async () => {
  const res = await axios.get('/api/analytics/monthly-summary');
  return res.data;
};
