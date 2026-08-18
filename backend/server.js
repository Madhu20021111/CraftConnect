// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const app = express();   // ✅ create app first

// Middleware
app.use(cors());
app.use(express.json()); // ✅ then enable JSON parsing
app.use(express.urlencoded({ extended: true })); // Add this to handle form data (e.g., from Postman "form-data" or "x-www-form-urlencoded")

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const productRoutes = require("./routes/products");
const artisanRoutes = require("./routes/artisans");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
// const orderRoutes = require("./routes/orders");

app.use("/api/products", productRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// Global Error Handler (handles Multer errors, payload size issues, etc.)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File too large. Maximum allowed size is 5MB." });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message || "An unexpected error occurred." });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));