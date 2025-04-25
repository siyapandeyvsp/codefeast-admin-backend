require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB(); 
app.use((req, res, next) => {
 
  next();
});
// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Define routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/admin', authRoutes);

// Set up the port to listen on
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
