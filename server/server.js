const app = require('./app');
const connectDB = require('./config/db');

const USE_DB = false;
const PORT = process.env.PORT || 5000;

if (USE_DB) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`DB connected. Server running at http://localhost:${PORT}`);
    });
  }).catch(() => {
    console.error("Failed to connect to DB. Server not started.");
  });
} else {
  app.listen(PORT, () => {
    console.log(`Mock mode: Server running at http://localhost:${PORT}`);
  });
}
