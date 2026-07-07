const db = require("../database/db");

// =======================================
// GET ALL ORDERS
// =======================================

exports.getOrders = (callback) => {

    db.query(

        `SELECT * FROM orders
        ORDER BY id DESC`,

        callback

    );

};

// =======================================
// CREATE ORDER
// =======================================

exports.createOrder = (order, callback) => {

    db.query(

        `INSERT INTO orders
        (customer_name,total_amount)
        VALUES(?,?)`,

        [

            order.customer_name,

            order.total_amount

        ],

        callback

    );

};

// =======================================
// ADD ORDER ITEM
// =======================================

exports.addOrderItem = (item, callback) => {

    db.query(

        `INSERT INTO order_items
        (order_id,food_name,quantity,price)
        VALUES(?,?,?,?)`,

        [

            item.order_id,

            item.food_name,

            item.quantity,

            item.price

        ],

        callback

    );

};

// =======================================
// DELETE ORDER
// =======================================

exports.deleteOrder = (id, callback) => {

    db.query(

        "DELETE FROM order_items WHERE order_id=?",

        [id],

        () => {

            db.query(

                "DELETE FROM orders WHERE id=?",

                [id],

                callback

            );

        }

    );

};

// =======================================
// UPDATE STATUS
// =======================================

exports.updateStatus = (id, status, callback) => {

    db.query(

        "UPDATE orders SET order_status=? WHERE id=?",

        [

            status,

            id

        ],

        callback

    );

};
// =======================================
// GET ORDER ITEMS
// =======================================

exports.getOrderItems = (id, callback) => {

    db.query(

        "SELECT * FROM order_items WHERE order_id=?",

        [id],

        callback

    );

};
