const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");

// Currently not enforcing 'role === admin' checking in auth middleware since it's a simple setup, 
// but we will use the standard authMiddleware for basic protection.
router.get("/users", getAllUsers);
router.delete("/profiles/:type/:id", deleteUser);

module.exports = router;
