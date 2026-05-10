// controllers/artisanController.js
const pool = require("../config/db");

// Get all artisans
const getArtisans = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM artisans");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new artisan
const addArtisan = async (req, res) => {
  const { name, village, craft_type, years_experience } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO artisans (name, village, craft_type, years_experience) VALUES (?, ?, ?, ?)",
      [name, village, craft_type, years_experience]
    );
    res.json({ id: result.insertId, name, village, craft_type, years_experience });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getArtisans, addArtisan };
