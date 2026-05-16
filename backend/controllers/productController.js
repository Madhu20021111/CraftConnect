const pool = require("../config/db");

// Get all products with artisan details
const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             a.name AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      ORDER BY p.id;
    `);
    res.json(result.rows); // PostgreSQL returns rows in result.rows
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { artisan_id, category, material, color, size, price } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (artisan_id, category, material, color, size, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [artisan_id, category, material, color, size, price]
    );
    res.json(result.rows[0]); // Return the inserted product
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct };
