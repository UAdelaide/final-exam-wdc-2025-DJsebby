const express = require('express'); //import express-sesison
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// creating express session
app.use(session({
    secret: 'hi',
    resave: false,
    saveUninitialized: true
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
// route to add in part 1 route
const dogRoutes = require('../part1/routes/api.js');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
// using this route
app.use('/api/', dogRoutes);

// Export the app instead of listening here
module.exports = app;