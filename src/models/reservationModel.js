const db = require("../database/db");

// =======================================
// GET ALL RESERVATIONS
// =======================================

exports.getReservations = (callback) => {

    db.query(

        `SELECT *
        FROM reservations
        ORDER BY id DESC`,

        callback

    );

};

// =======================================
// CREATE RESERVATION
// =======================================

exports.createReservation = (reservation, callback) => {

    db.query(

        `INSERT INTO reservations
        (customer_name,email,phone,reservation_date,reservation_time,guests)
        VALUES(?,?,?,?,?,?)`,

        [

            reservation.customer_name,

            reservation.email,

            reservation.phone,

            reservation.reservation_date,

            reservation.reservation_time,

            reservation.guests

        ],

        callback

    );

};

// =======================================
// DELETE RESERVATION
// =======================================

exports.deleteReservation = (id, callback) => {

    db.query(

        "DELETE FROM reservations WHERE id=?",

        [id],

        callback

    );

};
