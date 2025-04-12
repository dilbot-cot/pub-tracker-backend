require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pubs', require('./routes/pubRoutes'));
app.use('/api/mealtypes', require('./routes/mealTypeRoutes'));
app.use('/api/specials', require('./routes/specialsRoutes'));

// Root route
app.get('/', (req, res) => res.send('API running...'));

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));