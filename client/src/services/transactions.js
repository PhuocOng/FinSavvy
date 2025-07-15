import axios from 'axios';

export const fetchTransactionsWithFilters = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`/api/transactions?${query}`);
  return response.data;
};
