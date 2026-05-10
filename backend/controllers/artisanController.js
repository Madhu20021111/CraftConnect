const pool = require("../config/db");

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM artisans");
  res.json(rows);
});

