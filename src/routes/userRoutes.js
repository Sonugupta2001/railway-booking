const express = require("express");
const { checkAvailability, bookSeat, getBookingDetails } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/availability", authenticate, checkAvailability);
router.post("/book", authenticate, bookSeat);
router.get("/booking/:id", authenticate, getBookingDetails);

module.exports = router;