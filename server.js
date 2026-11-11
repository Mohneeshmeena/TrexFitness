require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({ 
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
  credentials: true 
}));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/workouts', require('./routes/workouts'));
app.use('/api/diets', require('./routes/diets'));
app.use('/api/custom-plans', require('./routes/customPlans'));

// Health check endpoint
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected / Connecting';
  res.json({ 
    message: '⚡ APEX FIT MERN API is Online', 
    version: '1.0.0',
    database: dbStatus,
    endpoints: [
      '/api/users',
      '/api/workouts',
      '/api/diets',
      '/api/custom-plans'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/apexfit';

// Start HTTP server immediately
app.listen(PORT, () => {
  console.log(`🚀 APEX FIT Backend running on http://localhost:${PORT}`);
  console.log(`📡 Connecting to MongoDB at: ${MONGODB_URI}`);
  
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log('✅ MongoDB Connected successfully!');
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB connection warning:', err.message);
      console.warn('💡 Tip: Make sure MongoDB is running locally, or configure MONGODB_URI in your .env file with MongoDB Atlas.');
    });
});
