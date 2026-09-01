const { Pool } = require("pg");

const pool = new Pool({
  database: "mywishlist",
});

module.exports = pool;