const express = require("express");

const router = express.Router();

const controller = require("../controllers/reservationController");

// =======================================
// GET ALL RESERVATIONS
// =======================================

router.get("/", controller.getReservations);

// =======================================
// CREATE RESERVATION
// =======================================

router.post("/", controller.createReservation);

// =======================================
// DELETE RESERVATION
// =======================================

router.delete("/:id", controller.deleteReservation);

module.exports = router;
