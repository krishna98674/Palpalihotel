const express = require("express");

const router = express.Router();

const controller = require("../controllers/dashboardController");

// =======================================
// GET DASHBOARD STATISTICS
// =======================================

router.get("/", controller.getStats);

module.exports = router;
