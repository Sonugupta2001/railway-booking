const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const userRoutes = require("./userRoutes");
const trainRoutes = require("./trainRoutes");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use("/admin/trains", authenticate, authorizeAdmin, trainRoutes);
router.use("/user/bookings", authenticate, userRoutes);

module.exports = router;
