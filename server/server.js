require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;





}).catch((err) => {
  console.error("❌ Failed to connect to DB. Server not started.");
});


connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`✅ DB connected. Server running at http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error("❌ Failed to connect to DB. Server not started.");
    console.error(err);
    process.exit(1); 
  });