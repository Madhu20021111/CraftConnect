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
  const { artisan_id, email, category, material, color, size, price, name, description } = req.body;
  
  // If a file was uploaded, construct the URL/path to save in DB, otherwise use the one from req.body (or null)
  const image_url = req.file ? `/${req.file.filename}` : (req.body.image_url || null);

  try {
    const db = await dbPromise;
    let finalArtisanId = artisan_id;

    // Resolve artisan_id from email if provided
    if (email) {
      const artisan = await db.get("SELECT id FROM artisans WHERE email = ?", [email]);
      if (artisan) {
        finalArtisanId = artisan.id;
      }
    }

    const result = await db.run(
      `INSERT INTO products (artisan_id, category, material, color, size, price, name, description, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [finalArtisanId, category, material, color, size, price, name, description, image_url]
    );
    const product = await db.get("SELECT * FROM products WHERE id = ?", [result.lastID]);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get products for a specific artisan by email
const getProductsByArtisan = async (req, res) => {
  const { artisanId } = req.params; // we'll treat this parameter as email
  try {
    const db = await dbPromise;
    const rows = await db.all(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             a.name AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE a.email = ?
      ORDER BY p.id DESC;
    `, [artisanId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct, getProductsByArtisan };
