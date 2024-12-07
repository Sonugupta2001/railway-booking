const express = require("express");
const { addTrain, updateTrainSeats, getAllTrains } = require("../controllers/trainController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authenticate, authorizeAdmin, addTrain);
router.put("/update/:id", authenticate, authorizeAdmin, updateTrainSeats);
router.get("/", authenticate, authorizeAdmin, getAllTrains);

module.exports = router;