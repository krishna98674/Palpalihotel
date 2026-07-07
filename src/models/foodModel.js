const db = require("../database/db");

// =======================================
// GET ALL FOODS
// =======================================

exports.getFoods = (callback) => {

    db.query(

        "SELECT * FROM foods ORDER BY id DESC",

        callback

    );

};

// =======================================
// ADD FOOD
// =======================================

exports.addFood = (food, callback) => {

    db.query(

        `INSERT INTO foods
        (food_name,description,price,category,image)
        VALUES(?,?,?,?,?)`,

        [

            food.food_name,

            food.description,

            food.price,

            food.category,

            food.image

        ],

        callback

    );

};

// =======================================
// UPDATE FOOD
// =======================================

exports.updateFood = (id, food, callback) => {

    db.query(

        `UPDATE foods
        SET
        food_name=?,
        description=?,
        price=?,
        category=?,
        image=?
        WHERE id=?`,

        [

            food.food_name,

            food.description,

            food.price,

            food.category,

            food.image,

            id

        ],

        callback

    );

};

// =======================================
// DELETE FOOD
// =======================================

exports.deleteFood = (id, callback) => {

    db.query(

        "DELETE FROM foods WHERE id=?",

        [id],

        callback

    );

};
