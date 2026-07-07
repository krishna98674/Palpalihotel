const reservationModel = require("../models/reservationModel");

function addReservation(req, res) {

    reservationModel.createReservation(req.body, (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            message: "Reservation Added Successfully"
        });

    });

}

module.exports = {
    addReservation
};
