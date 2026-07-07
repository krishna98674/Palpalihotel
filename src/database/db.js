const mysql = require("mysql2");

// Create MySQL connection pool
const pool = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

// Test database connection
pool.getConnection((err, connection) => {

    if (err) {

        console.error("❌ Database Connection Failed");
        console.error(err);

        return;

    }

    console.log("✅ Connected to MySQL Database");

    connection.release();

});

module.exports = pool;
