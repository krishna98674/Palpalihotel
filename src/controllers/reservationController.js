const reservationModel = require("../models/reservationModel");

// =======================================
// GET ALL RESERVATIONS
// =======================================

exports.getReservations = (req, res) => {

    reservationModel.getReservations((err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// =======================================
// CREATE RESERVATION
// =======================================

exports.createReservation = (req, res) => {

    reservationModel.createReservation(req.body, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            success: true,

            message: "Reservation Added Successfully"

        });

    });

};

// =======================================
// DELETE RESERVATION
// =======================================

exports.deleteReservation = (req, res) => {

    reservationModel.deleteReservation(req.params.id, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            success: true,

            message: "Reservation Deleted Successfully"

        });

    });

};
