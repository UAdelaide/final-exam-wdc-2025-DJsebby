const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  // wrapping the response to make front-end easier
  res.json({ user: req.session.user});
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  // reads username and password
  const { username, password } = req.body;

  try {
    // queries the database and gets user info
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);
    // if no user is found must be invalid credentials
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // if user is found save info in session
    req.session.user = rows[0];
    // respond with user info
    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// logout route
router.post('/logout', async (req, res) => {
  // destror the session removing its data
  req.session.destroy(err => {
    if (err) {
      // if error json saying where the error happened
      return res.json({ error: 'logout failed in route' });
    }
    // clear cookie from browser
    res.clearCookie('connect.sid');
    // respon with JSON confirming logout was a success.
    res.json({ message: 'logout successful!' });
  });


  // route to get the dogs depending on the owner
  router.get('/dogIDs', async (req, res) => {
    // check if user is logged in first with sesison
    if (!req.session.user) {
      return res.json({ error: 'not logged in' });
    }

    try {
      // get the owner id from user_id
      const owner_id = req.session.user.user_id;
      // query the database to return all dog from the owner id
      const [dogs] = await db.query(`
        SELECT dog_id, name
        FROM Dogs
        WHERE owner_id = ?
        `, [owner_id]);
        // json to return the dogs
      res.json(dogs);
    } catch (error) {
      res.json({ error: 'couldnt load in dogs' });
    }
  });

});

module.exports = router;