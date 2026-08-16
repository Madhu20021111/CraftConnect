// controllers/artisanController.js
const dbPromise = require("../config/db");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Get all artisans
const getArtisans = async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM artisans");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my profile using JWT
const getMyProfile = async (req, res) => {
  try {
    const db = await dbPromise;
    const artisanId = req.user.artisanId;
    if (!artisanId) {
      return res.status(404).json({ error: "No artisan profile found for this user." });
    }
    const row = await db.get("SELECT * FROM artisans WHERE id = ?", [artisanId]);
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Artisan not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single artisan by ID
const getArtisanById = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await dbPromise;
    const row = await db.get("SELECT * FROM artisans WHERE id = ?", [id]);
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Artisan not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new artisan
const addArtisan = async (req, res) => {
  const { name, village, craft_type, years_experience, phone, email } = req.body;
  try {
    const db = await dbPromise;
    const result = await db.run(
      "INSERT INTO artisans (name, village, craft_type, years_experience, contact_number, email) VALUES (?, ?, ?, ?, ?, ?)",
      [name, village, craft_type, years_experience, phone, email]
    );
    res.json({ id: result.lastID, name, village, craft_type, years_experience, phone, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update artisan
const updateArtisan = async (req, res) => {
  const { id } = req.params;
  const { name, village, craft_type, years_experience, contact_number, email, image_url } = req.body;
  try {
    const db = await dbPromise;
    await db.run(
      "UPDATE artisans SET name=?, village=?, craft_type=?, years_experience=?, contact_number=?, email=?, image_url=? WHERE id=?",
      [name, village, craft_type, years_experience, contact_number, email, image_url, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload profile image
const uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  
  // Create a URL for the uploaded file
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};

module.exports = { 
  getArtisans, 
  getArtisanById, 
  getMyProfile,
  addArtisan, 
  updateArtisan, 
  upload, 
  uploadProfileImage 
};
