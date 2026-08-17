const dbPromise = require("../config/db");

// Get all profiles (Registered Users + Standalone Artisans)
const getAllUsers = async (req, res) => {
  try {
    const db = await dbPromise;
    const profiles = await db.all(`
      SELECT 
        'user' AS profile_type,
        u.id AS user_id, 
        a.id AS artisan_id,
        u.name, 
        u.email, 
        u.role
      FROM users u
      LEFT JOIN artisans a ON u.id = a.user_id
      
      UNION
      
      SELECT 
        'artisan' AS profile_type,
        NULL AS user_id, 
        a.id AS artisan_id,
        a.name, 
        a.email, 
        'artisan_only' AS role
      FROM artisans a
      WHERE a.user_id IS NULL
      
      ORDER BY profile_type DESC, user_id DESC, artisan_id DESC
    `);
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete profile entirely (either a user or a standalone artisan)
const deleteUser = async (req, res) => {
  const { type, id } = req.params; // type is 'user' or 'artisan'
  
  try {
    const db = await dbPromise;
    
    if (type === 'user') {
      // 1. Get the artisan_id for this user (if they have one)
      const artisan = await db.get("SELECT id FROM artisans WHERE user_id = ?", [id]);
      
      if (artisan) {
        // 2. Delete all products belonging to this artisan
        await db.run("DELETE FROM products WHERE artisan_id = ?", [artisan.id]);
        
        // 3. Delete the artisan profile
        await db.run("DELETE FROM artisans WHERE id = ?", [artisan.id]);
      }
      
      // 4. Delete the user record itself
      const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
      if (result.changes === 0) {
        return res.status(404).json({ error: "User not found" });
      }
    } else if (type === 'artisan') {
      // Delete standalone artisan and their products
      await db.run("DELETE FROM products WHERE artisan_id = ?", [id]);
      const result = await db.run("DELETE FROM artisans WHERE id = ?", [id]);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Artisan not found" });
      }
    } else {
      return res.status(400).json({ error: "Invalid profile type" });
    }
    
    res.json({ success: true, message: "Profile successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser
};
