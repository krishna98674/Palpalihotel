const db = require("../database/db");

function createOrder(customerName, totalAmount, callback) {

    const sql = `
        INSERT INTO orders (customer_name, total_amount)
        VALUES (?, ?)
    `;

    db.query(sql, [customerName, totalAmount], callback);

}

function addOrderItem(orderId, item, callback) {

    const sql = `
        INSERT INTO order_items
        (order_id, food_name, quantity, price)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            orderId,
            item.name,
            item.quantity,
            item.price
        ],
        callback
    );

}

module.exports = {
    createOrder,
    addOrderItem
};
