const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - GET /api/greetings - Say hi to friends`);
  console.log(`   - GET /api/health - Health check`);
});