const orderModel = require("../models/orderModel");

function placeOrder(req, res) {

    const customerName = req.body.customer_name;

    const totalAmount = req.body.total_amount;

    const items = req.body.items;

    orderModel.createOrder(customerName, totalAmount, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        const orderId = result.insertId;

        let completed = 0;

        items.forEach(item => {

            orderModel.addOrderItem(orderId, item, () => {

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

}

module.exports = {
    placeOrder
};
