// routes/artisans.js
const express = require("express");
const router = express.Router();
const { getArtisans, addArtisan } = require("../controllers/artisanController");
const pool = require("../config/db");

router.get("/", getArtisans);
router.post("/", addArtisan);

// Example route: get all artisans
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM artisans");
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Example route: add artisan


// router.post("/", (req, res) => {
//   const { name, village, craft_type, years_experience } = req.body;
//   res.json({ id: 1, name, village, craft_type, years_experience });
// });

module.exports = router;
