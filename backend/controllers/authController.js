const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPromise = require('../config/db');

// In a real app, this should be an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_craftconnect_key_123';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const db = await dbPromise;

    // Check if user already exists
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const result = await db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'artisan')",
      [name, email, hashedPassword]
    );

    const userId = result.lastID;

    // Optional: create a blank artisan profile for them
    await db.run(
      "INSERT INTO artisans (user_id, name, email) VALUES (?, ?, ?)",
      [userId, name, email]
    );

    // Generate token
    const token = jwt.sign(
      { userId: userId, email: email, role: 'artisan' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, name, email, role: 'artisan' }
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const db = await dbPromise;

    // Find user
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if they registered via Google and have no password
    if (!user.password) {
      return res.status(401).json({ error: 'Please sign in with Google' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

module.exports = {
  register,
  login
};
