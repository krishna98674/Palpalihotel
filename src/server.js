require("dotenv").config();

const express = require("express");
const path = require("path");

require("./database/db");

const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../public/index.html"));

});

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});
