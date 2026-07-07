const express = require("express");

const router = express.Router();

const controller = require("../controllers/foodController");

// =======================================
// GET ALL FOODS
// =======================================

router.get("/", controller.getFoods);

// =======================================
// ADD FOOD
// =======================================

router.post("/", controller.addFood);

// =======================================
// UPDATE FOOD
// =======================================

router.put("/:id", controller.updateFood);

// =======================================
// DELETE FOOD
// =======================================

router.delete("/:id", controller.deleteFood);

module.exports = router;
