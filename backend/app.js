const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

// setting up the environment variables
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());

// import all the routes
const billingRoutes = require('./routes/billing');
const authRoutes = require('./routes/auth');

app.use('/api', billingRoutes);
app.use('/api', authRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
