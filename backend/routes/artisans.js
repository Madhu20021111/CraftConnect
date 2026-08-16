// routes/artisans.js
const express = require("express");
const router = express.Router();
const { 
  getArtisans, 
  getArtisanById,
  getMyProfile,
  addArtisan, 
  updateArtisan,
  upload,
  uploadProfileImage
} = require("../controllers/artisanController");

const authMiddleware = require("../middleware/auth");

router.get("/my-profile", authMiddleware, getMyProfile);
router.get("/", getArtisans);
router.get("/:id", getArtisanById);
router.post("/", addArtisan);
router.put("/:id", authMiddleware, updateArtisan);
router.post("/:id/upload", authMiddleware, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
