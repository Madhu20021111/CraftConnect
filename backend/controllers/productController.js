// controllers/productController.js
const pool = require("../config/db");

// Get all products
const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { artisan_id, category, material, color, size, price } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO products (artisan_id, category, material, color, size, price) VALUES (?, ?, ?, ?, ?, ?)",
      [artisan_id, category, material, color, size, price]
    );
    res.json({ id: result.insertId, artisan_id, category, material, color, size, price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct };
