// routes/artisans.js
const express = require("express");
const router = express.Router();

// Example route: get all artisans
router.get("/", (req, res) => {
  res.json({ message: "Artisans route working!" });
});

// Example route: add artisan
router.post("/", (req, res) => {
  const { name, village, craft_type, years_experience } = req.body;
  // Later you’ll connect this to MySQL
  res.json({ id: 1, name, village, craft_type, years_experience });
});

module.exports = router;
