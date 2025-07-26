const mockPlaidClient = {
  itemPublicTokenExchange: jest.fn().mockResolvedValue({
    data: {
      access_token: 'mock_access_token'
    }
  }),
  transactionsGet: jest.fn().mockResolvedValue({
    data: {
      transactions: [
        {
          name: 'Mock Coffee Shop',
          amount: 4.5,
          date: '2025-07-24'
        },
        {
          name: 'Mock Grocery',
          amount: 20.0,
          date: '2025-07-23'
        }
      ]
    }
  })
};

module.exports = mockPlaidClient;