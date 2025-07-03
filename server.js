const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const customerVisitRoutes = require('./routes/customerVisits');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://ragotmaragavendar2404:gnvx1nTGVvWq2P9u@coursereg.228zi.mongodb.net/?retryWrites=true&w=majority&appName=coursereg',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }
)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/customer-visits', customerVisitRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Travel&Go API');
});

// Chatbot endpoint
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  // Simple response logic (will be enhanced with AI later)
  const responses = {
    'weather': 'The weather information will be provided here.',
    'places': 'Here are some popular places to visit.',
    'help': 'I can help you with weather information, places to visit, and travel planning.'
  };

  let response = 'I can help you with weather information, places to visit, and travel planning.';
  for (const [key, value] of Object.entries(responses)) {
    if (message.toLowerCase().includes(key)) {
      response = value;
      break;
    }
  }

  res.json({ response });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const startServer = (port) => {
  if (port >= 65536) {
    console.error('No available ports found');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

const PORT = parseInt(process.env.PORT) || 5000;
startServer(PORT); 