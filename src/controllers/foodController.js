const foodModel = require("../models/foodModel");

// =======================================
// GET ALL FOODS
// =======================================

exports.getFoods = (req, res) => {

    foodModel.getFoods((err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// =======================================
// ADD FOOD
// =======================================

exports.addFood = (req, res) => {

    foodModel.addFood(req.body, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            success: true,

            message: "Food Added Successfully"

        });

    });

};

// =======================================
// UPDATE FOOD
// =======================================

exports.updateFood = (req, res) => {

    foodModel.updateFood(

        req.params.id,

        req.body,

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Food Updated Successfully"

            });

        }

    );

};

// =======================================
// DELETE FOOD
// =======================================

exports.deleteFood = (req, res) => {

    foodModel.deleteFood(req.params.id, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            success: true,

            message: "Food Deleted Successfully"

        });

    });

};
