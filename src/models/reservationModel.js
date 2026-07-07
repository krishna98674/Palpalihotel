const db = require("../database/db");

// Insert Reservation
function createReservation(data, callback) {

    const sql = `
        INSERT INTO reservations
        (customer_name, email, phone, reservation_date, reservation_time, guests)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.customer_name,
            data.email,
            data.phone,
            data.reservation_date,
            data.reservation_time,
            data.guests
        ],
        callback
    );
}

module.exports = {
    createReservation
};
