const express = require("express");

const router = express.Router();

const reservationController = require("../controllers/reservationController");

// POST Reservation
router.post("/", reservationController.addReservation);

module.exports = router;
