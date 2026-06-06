// controllers/productController.js
const dbPromise = require("../config/db");

// Get all products with artisan details
const getProducts = async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             a.name AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      ORDER BY p.id;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { artisan_id, category, material, color, size, price, name, description, image_url } = req.body;
  try {
    const db = await dbPromise;
    const result = await db.run(
      `INSERT INTO products (artisan_id, category, material, color, size, price, name, description, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [artisan_id, category, material, color, size, price, name, description, image_url]
    );
    const product = await db.get("SELECT * FROM products WHERE id = ?", [result.lastID]);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct };
