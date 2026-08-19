// controllers/productController.js
const dbPromise = require("../config/db");

// Get all products with artisan details (using LEFT JOIN so all products show on the homepage)
const getProducts = async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             p.category, p.material, p.color, p.size,
             COALESCE(a.name, 'Master Artisan') AS artisan_name,
             COALESCE(a.village, 'Heritage Workshop') AS village,
             COALESCE(a.craft_type, p.category, 'Handcraft') AS craft_type,
             a.contact_number, a.email
      FROM products p
      LEFT JOIN artisans a ON p.artisan_id = a.id
      ORDER BY p.id DESC;
    `);
    res.json(rows);
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { artisan_id, category, material, color, size, price, name, description } = req.body;
  const email = req.user?.email || req.body.email;
  const userId = req.user?.userId || req.user?.id;
  const tokenArtisanId = req.user?.artisanId;
  
  // If a file was uploaded, construct the URL/path to save in DB, otherwise use the one from req.body (or null)
  const image_url = req.file ? `/${req.file.filename}` : (req.body.image_url || null);

  try {
    const db = await dbPromise;
    let finalArtisanId = artisan_id || tokenArtisanId;

    // 1. If an artisan_id was passed/present, check if it actually exists in the DB
    if (finalArtisanId) {
      const existing = await db.get("SELECT id FROM artisans WHERE id = ?", [finalArtisanId]);
      if (!existing) {
        finalArtisanId = null;
      }
    }

    // 2. Resolve by userId if available
    if (!finalArtisanId && userId) {
      const artisan = await db.get("SELECT id FROM artisans WHERE user_id = ?", [userId]);
      if (artisan) {
        finalArtisanId = artisan.id;
      }
    }

    // 3. Resolve by email if available
    if (!finalArtisanId && email) {
      const artisan = await db.get("SELECT id FROM artisans WHERE LOWER(email) = LOWER(?)", [email]);
      if (artisan) {
        finalArtisanId = artisan.id;
      }
    }

    // 4. Auto-create an artisan profile if user has an account but no artisan row yet
    if (!finalArtisanId && (userId || email)) {
      const userName = req.user?.name || (email ? email.split('@')[0] : 'Artisan');
      const insertArtisan = await db.run(
        "INSERT INTO artisans (user_id, name, email, craft_type) VALUES (?, ?, ?, ?)",
        [userId || null, userName, email || null, category || 'Handcraft']
      );
      finalArtisanId = insertArtisan.lastID;
    }

    // 5. Fallback: Default to first artisan or create one
    if (!finalArtisanId) {
      const firstArtisan = await db.get("SELECT id FROM artisans ORDER BY id ASC LIMIT 1");
      if (firstArtisan) {
        finalArtisanId = firstArtisan.id;
      } else {
        const createDefault = await db.run(
          "INSERT INTO artisans (name, craft_type, village) VALUES ('Master Artisan', 'Crafts', 'Heritage Workshop')"
        );
        finalArtisanId = createDefault.lastID;
      }
    }

    const result = await db.run(
      `INSERT INTO products (artisan_id, category, material, color, size, price, name, description, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [finalArtisanId, category, material, color, size, price, name, description, image_url]
    );
    const product = await db.get("SELECT * FROM products WHERE id = ?", [result.lastID]);
    res.status(201).json(product);
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get products for a specific artisan by email or ID
const getProductsByArtisan = async (req, res) => {
  const { artisanId } = req.params; // can be email or numeric ID
  const isEmail = artisanId && artisanId.includes('@');
  
  try {
    const db = await dbPromise;
    let query = `
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             COALESCE(a.name, 'Master Artisan') AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email
      FROM products p
      LEFT JOIN artisans a ON p.artisan_id = a.id
    `;
    
    if (isEmail) {
      query += ` WHERE LOWER(a.email) = LOWER(?) ORDER BY p.id DESC;`;
    } else {
      query += ` WHERE a.id = ? OR p.artisan_id = ? ORDER BY p.id DESC;`;
    }
    
    const params = isEmail ? [artisanId] : [artisanId, artisanId];
    const rows = await db.all(query, params);
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
      SELECT p.*, 
             COALESCE(a.name, 'Master Artisan') AS artisan_name, 
             a.email, 
             a.village, 
             a.craft_type, 
             a.image_url AS artisan_image
      FROM products p
      LEFT JOIN artisans a ON p.artisan_id = a.id
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
  const email = req.user?.email;
  const userId = req.user?.userId || req.user?.id;
  const tokenArtisanId = req.user?.artisanId;

  try {
    const db = await dbPromise;
    // Check if product exists and belongs to this artisan / user / admin
    let product;
    if (req.user?.role === 'admin') {
      product = await db.get("SELECT * FROM products WHERE id = ?", [id]);
    } else {
      product = await db.get(`
        SELECT p.* FROM products p
        LEFT JOIN artisans a ON p.artisan_id = a.id
        WHERE p.id = ? AND (
          p.artisan_id = ? OR 
          (a.user_id IS NOT NULL AND a.user_id = ?) OR 
          (a.email IS NOT NULL AND LOWER(a.email) = LOWER(?))
        )
      `, [id, tokenArtisanId || -1, userId || -1, email || '']);
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found or unauthorized" });
    }

    const image_url = req.file ? `/${req.file.filename}` : (req.body.image_url || product.image_url);

    await db.run(
      `UPDATE products 
       SET category = ?, material = ?, color = ?, size = ?, price = ?, name = ?, description = ?, image_url = ?
       WHERE id = ?`,
      [category || product.category, material, color, size, price, name, description, image_url, id]
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
  const email = req.user?.email;
  const userId = req.user?.userId || req.user?.id;
  const tokenArtisanId = req.user?.artisanId;

  try {
    const db = await dbPromise;
    let product;
    if (req.user?.role === 'admin') {
      product = await db.get("SELECT * FROM products WHERE id = ?", [id]);
    } else {
      product = await db.get(`
        SELECT p.* FROM products p
        LEFT JOIN artisans a ON p.artisan_id = a.id
        WHERE p.id = ? AND (
          p.artisan_id = ? OR 
          (a.user_id IS NOT NULL AND a.user_id = ?) OR 
          (a.email IS NOT NULL AND LOWER(a.email) = LOWER(?))
        )
      `, [id, tokenArtisanId || -1, userId || -1, email || '']);
    }

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
  const email = req.user?.email;
  const userId = req.user?.userId || req.user?.id;
  const artisanId = req.user?.artisanId;

  try {
    const db = await dbPromise;
    let targetArtisanId = artisanId;
    if (!targetArtisanId && userId) {
      const art = await db.get("SELECT id FROM artisans WHERE user_id = ?", [userId]);
      if (art) targetArtisanId = art.id;
    }
    if (!targetArtisanId && email) {
      const art = await db.get("SELECT id FROM artisans WHERE LOWER(email) = LOWER(?)", [email]);
      if (art) targetArtisanId = art.id;
    }

    const rows = await db.all(`
      SELECT p.id, p.name, p.description, p.price, p.image_url,
             COALESCE(a.name, 'My Artwork') AS artisan_name, a.village, a.craft_type,
             a.contact_number, a.email, p.category, p.material, p.color, p.size
      FROM products p
      LEFT JOIN artisans a ON p.artisan_id = a.id
      WHERE p.artisan_id = ? 
         OR (a.user_id IS NOT NULL AND a.user_id = ?)
         OR (a.email IS NOT NULL AND LOWER(a.email) = LOWER(?))
      ORDER BY p.id DESC;
    `, [targetArtisanId || -1, userId || -1, email || '']);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, addProduct, getProductsByArtisan, getMyArtworks, updateProduct, deleteProduct, getProductById };
