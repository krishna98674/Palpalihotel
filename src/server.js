require("dotenv").config();

const express = require("express");
const path = require("path");

require("./database/db");
const dashboardRoutes = require("./routes/dashboardRoutes");

const reservationRoutes = require("./routes/reservationRoutes");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
 
const foodRoutes=require("./routes/foodRoutes");

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/foods",foodRoutes);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/reservations", reservationRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/index.html"));

});

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});
