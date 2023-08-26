const mysql = require("mysql2/promise");

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "buku_db",
});

module.exports = dbPool;
