const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to handle JSON data
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, // Set the client URL where you want to access your API
  credentials: true, // Send credentials with the request
}))

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the File Sharing App');
});

// Import file routes
const fileRoutes = require('./routes/fileRoutes');
const connectdb = require('./config/db');
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectdb(); // config mongoose
  console.log(`Server running on port ${PORT}`);
});
