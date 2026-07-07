const orderModel = require("../models/orderModel");

// =======================================
// GET ALL ORDERS
// =======================================

exports.getOrders = (req, res) => {

    orderModel.getOrders((err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// =======================================
// GET ORDER ITEMS
// =======================================

exports.getOrderItems = (req, res) => {

    orderModel.getOrderItems(req.params.id, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// =======================================
// CREATE ORDER
// =======================================

exports.createOrder = (req, res) => {

    const order = req.body;

    orderModel.createOrder(order, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        const orderId = result.insertId;

        const items = order.items;

        if (!items || items.length === 0) {

            return res.json({

                success: true,

                message: "Order Created"

            });

        }

        let completed = 0;

        items.forEach(item => {

            orderModel.addOrderItem({

                order_id: orderId,

                food_name: item.name,

                quantity: item.quantity,

                price: item.price

            }, () => {

                completed++;

                if (completed === items.length) {

                    res.json({

                        success: true,

                        message: "Order Placed Successfully"

                    });

                }

            });

        });

    });

};

// =======================================
// DELETE ORDER
// =======================================

exports.deleteOrder = (req, res) => {

    orderModel.deleteOrder(req.params.id, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            success: true,

            message: "Order Deleted"

        });

    });

};

// =======================================
// UPDATE STATUS
// =======================================

exports.updateStatus = (req, res) => {

    orderModel.updateStatus(

        req.params.id,

        req.body.status,

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Status Updated"

            });

        }

    );

};
