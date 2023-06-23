const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "486486486",
  database: "db_products",
});

module.exports = connection;
