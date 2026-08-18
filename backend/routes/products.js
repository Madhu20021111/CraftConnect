// routes/products.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { 
  getProducts, 
  addProduct, 
  getProductsByArtisan, 
  getMyArtworks, 
  updateProduct, 
  deleteProduct, 
  getProductById 
} = require("../controllers/productController");

const authMiddleware = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
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

router.get("/", getProducts);
router.post("/", authMiddleware, upload.single("image"), addProduct);
router.get("/my-artworks", authMiddleware, getMyArtworks);
router.get("/artisan/:artisanId", getProductsByArtisan);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
