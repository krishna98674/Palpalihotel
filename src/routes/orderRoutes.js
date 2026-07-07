const express = require("express");

const router = express.Router();

const controller = require("../controllers/orderController");

router.get("/", controller.getOrders);

router.get("/:id/items", controller.getOrderItems);

router.post("/", controller.createOrder);

router.put("/:id", controller.updateStatus);

router.delete("/:id", controller.deleteOrder);

module.exports = router;
