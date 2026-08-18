const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPromise = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'craftconnect_secure_jwt_token_secret_key_2026_production';

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

    // Create a blank artisan profile for them
    const artisanResult = await db.run(
      "INSERT INTO artisans (user_id, name, email) VALUES (?, ?, ?)",
      [userId, name, email]
    );
    const artisanId = artisanResult.lastID;

    // Generate token
    const token = jwt.sign(
      { userId: userId, artisanId: artisanId, email: email, role: 'artisan' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, artisanId: artisanId, name, email, role: 'artisan' }
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

    // Fetch artisan ID
    const artisan = await db.get("SELECT id FROM artisans WHERE user_id = ?", [user.id]);
    const artisanId = artisan ? artisan.id : null;

    // Generate token
    const token = jwt.sign(
      { userId: user.id, artisanId: artisanId, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, artisanId: artisanId, name: user.name, email: user.email, role: user.role }
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
