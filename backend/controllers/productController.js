// controllers/productController.js
const dbPromise = require("../config/db");

// Get all products with artisan details
const getProducts = async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             p.category, p.material, p.color, p.size,
             a.name AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      ORDER BY p.id DESC;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { artisan_id, category, material, color, size, price, name, description } = req.body;
  const email = req.user?.email || req.body.email;
  
  // If a file was uploaded, construct the URL/path to save in DB, otherwise use the one from req.body (or null)
  const image_url = req.file ? `/${req.file.filename}` : (req.body.image_url || null);

  try {
    const db = await dbPromise;
    let finalArtisanId = artisan_id;

    // Resolve artisan_id from email if provided
    if (email) {
      const artisan = await db.get("SELECT id FROM artisans WHERE LOWER(email) = LOWER(?)", [email]);
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

// Get products for a specific artisan by email or ID
const getProductsByArtisan = async (req, res) => {
  const { artisanId } = req.params; // can be email or numeric ID
  const isEmail = artisanId.includes('@');
  
  try {
    const db = await dbPromise;
    let query = `
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             a.name AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
    `;
    
    if (isEmail) {
      query += ` WHERE LOWER(a.email) = LOWER(?) ORDER BY p.id DESC;`;
    } else {
      query += ` WHERE a.id = ? ORDER BY p.id DESC;`;
    }
    
    const rows = await db.all(query, [artisanId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await dbPromise;
    const product = await db.get(`
      SELECT p.*, a.name AS artisan_name, a.email 
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE p.id = ?
    `, [id]);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category, material, color, size, price, name, description } = req.body;
  const email = req.user.email;

  try {
    const db = await dbPromise;
    // Check if product exists and belongs to this artisan
    const product = await db.get(`
      SELECT p.* FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE p.id = ? AND LOWER(a.email) = LOWER(?)
    `, [id, email]);

    if (!product) {
      return res.status(404).json({ error: "Product not found or unauthorized" });
    }

    const image_url = req.file ? `/${req.file.filename}` : product.image_url;

    await db.run(
      `UPDATE products 
       SET category = ?, material = ?, color = ?, size = ?, price = ?, name = ?, description = ?, image_url = ?
       WHERE id = ?`,
      [category, material, color, size, price, name, description, image_url, id]
    );

    const updatedProduct = await db.get("SELECT * FROM products WHERE id = ?", [id]);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  try {
    const db = await dbPromise;
    // Check if product exists and belongs to this artisan
    const product = await db.get(`
      SELECT p.* FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE p.id = ? AND LOWER(a.email) = LOWER(?)
    `, [id, email]);

    if (!product) {
      return res.status(404).json({ error: "Product not found or unauthorized" });
    }

    await db.run("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get products for logged in user
const getMyArtworks = async (req, res) => {
  const email = req.user.email;
  try {
    const db = await dbPromise;
    const rows = await db.all(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             a.name AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email, p.category, p.material, p.color, p.size
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE LOWER(a.email) = LOWER(?)
      ORDER BY p.id DESC;
    `, [email]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct, getProductsByArtisan, getMyArtworks, updateProduct, deleteProduct, getProductById };
