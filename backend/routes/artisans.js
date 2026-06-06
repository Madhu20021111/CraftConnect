// routes/artisans.js
const express = require("express");
const router = express.Router();
const { 
  getArtisans, 
  getArtisanById,
  addArtisan, 
  updateArtisan,
  upload,
  uploadProfileImage
} = require("../controllers/artisanController");

router.get("/", getArtisans);
router.get("/:id", getArtisanById);
router.post("/", addArtisan);
router.put("/:id", updateArtisan);
router.post("/:id/upload", upload.single('profileImage'), uploadProfileImage);

module.exports = router;
