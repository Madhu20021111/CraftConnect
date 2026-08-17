// routes/products.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getProducts, addProduct, getProductsByArtisan, getMyArtworks, updateProduct, deleteProduct, getProductById } = require("../controllers/productController");

const authMiddleware = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get("/", getProducts);
router.post("/", authMiddleware, upload.single("image"), addProduct);
router.get("/my-artworks", authMiddleware, getMyArtworks);
router.get("/artisan/:artisanId", getProductsByArtisan);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
