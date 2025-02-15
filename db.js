const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_SERVER || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Password1!",
  database: process.env.DB_NAME || "HayirKurumuDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
