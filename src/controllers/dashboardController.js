const dashboardModel = require("../models/dashboardModel");

// =======================================
// GET DASHBOARD STATS
// =======================================

exports.getStats = (req, res) => {

    dashboardModel.getStats((err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result[0]);

    });

};
