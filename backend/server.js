// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
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
// const orderRoutes = require("./routes/orders");

app.use("/api/products", productRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));