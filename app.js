require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/adoptions', require('./routes/adoptions'));

app.use('/admin', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/welcome.html');
});

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));