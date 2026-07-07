const db = require("../database/db");

// =======================================
// DASHBOARD STATS
// =======================================

exports.getStats = (callback) => {

    const sql = `
    SELECT

    (SELECT COUNT(*) FROM foods) AS totalFoods,

    (SELECT COUNT(*) FROM orders) AS totalOrders,

    (SELECT COUNT(*) FROM reservations) AS totalReservations,

    (SELECT IFNULL(SUM(total_amount),0) FROM orders)
    AS totalRevenue
    `;

    db.query(sql, callback);

};
