// controllers/productController.js
const pool = require("../config/db");

// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { artisan_id, category, material, color, size, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (artisan_id, category, material, color, size, price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [artisan_id, category, material, color, size, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct };
