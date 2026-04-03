require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const innovationRoutes = require('./routes/innovationRoutes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Debugging checks for Render environment
console.log('--- Startup Diagnostic ---');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
if (!process.env.JWT_SECRET) {
  console.error('❌ CRITICAL ERROR: JWT_SECRET is missing! Auth will fail.');
}
console.log('-------------------------');

app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/innovations', innovationRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/innovex';

// Disable Mongoose buffering so that it fails fast if not connected
mongoose.set('bufferCommands', false);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Mongoose Connection Error Details:', err.name, ':', err.message);
    if (err.message.includes('buffering timed out')) {
      console.error('👉 TIP: This usually means your MongoDB IP Whitelist is blocking Render. See walkthrough.md!');
    }
    console.warn('⚠️ Starting server without DB connection (fallback mode)');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (no DB)`));
  });
