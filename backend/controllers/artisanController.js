// controllers/artisanController.js
const dbPromise = require("../config/db");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads with secure file filtering and size limits
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Sanitize extension to prevent extension spoofing
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /^\.(jpeg|jpg|png|webp|gif)$/i;
  const allowedMimeTypes = /^image\/(jpeg|png|webp|gif)$/i;
  
  const ext = path.extname(file.originalname).toLowerCase();
  const isExtValid = allowedExtensions.test(ext);
  const isMimeValid = allowedMimeTypes.test(file.mimetype);

  if (isExtValid && isMimeValid) {
    return cb(null, true);
  }
  cb(new Error("Invalid file type. Only JPG, PNG, WEBP, and GIF image files are allowed."));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Get all public artisans (excluding admin accounts)
const getArtisans = async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all(`
      SELECT a.* 
      FROM artisans a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE (u.role IS NULL OR u.role != 'admin')
        AND (a.email IS NULL OR LOWER(a.email) != 'niroshamadumali37@gmail.com')
      ORDER BY a.id DESC
    `);
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

// Update artisan with strict ownership validation
const updateArtisan = async (req, res) => {
  let { id } = req.params;
  if (id === "my-profile") {
    id = req.user?.artisanId;
    if (!id) return res.status(404).json({ error: "No artisan profile linked to this user." });
  }

  const { name, village, craft_type, years_experience, contact_number, email, image_url } = req.body;

  try {
    const db = await dbPromise;
    const existing = await db.get("SELECT * FROM artisans WHERE id = ?", [id]);
    if (!existing) return res.status(404).json({ error: "Artisan not found" });

    // Authorization: User can only update their own profile unless they are an admin
    const isOwner = (req.user?.artisanId && String(req.user.artisanId) === String(id)) ||
                    (existing.user_id && String(existing.user_id) === String(req.user?.userId)) ||
                    (req.user?.email && existing.email && req.user.email.toLowerCase() === existing.email.toLowerCase());
    const isAdmin = req.user?.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Forbidden: You are not authorized to update this artisan profile." });
    }

    const finalImage = image_url !== undefined ? image_url : existing.image_url;
    const finalVillage = village !== undefined ? village : existing.village;
    const finalCraftType = craft_type !== undefined ? craft_type : existing.craft_type;
    const finalYears = years_experience !== undefined ? years_experience : existing.years_experience;
    const finalContact = contact_number !== undefined ? contact_number : existing.contact_number;

    await db.run(
      "UPDATE artisans SET name=?, village=?, craft_type=?, years_experience=?, contact_number=?, email=?, image_url=? WHERE id=?",
      [name || existing.name, finalVillage, finalCraftType, finalYears, finalContact, email || existing.email, finalImage, id]
    );
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload profile image with ownership check
const uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded or file format rejected." });
  }

  const { id } = req.params;
  const isOwner = (req.user?.artisanId && String(req.user.artisanId) === String(id)) || id === "my-profile";
  const isAdmin = req.user?.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: "Forbidden: You are not authorized to upload images for this profile." });
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
