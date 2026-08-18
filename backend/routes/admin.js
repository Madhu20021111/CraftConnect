const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const { authMiddleware, requireAdmin } = require("../middleware/auth");

// Secure all admin endpoints with authentication and admin role check
router.use(authMiddleware, requireAdmin);

router.get("/users", getAllUsers);
router.delete("/profiles/:type/:id", deleteUser);

module.exports = router;
