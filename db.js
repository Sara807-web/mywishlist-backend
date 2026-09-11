const { Pool, types } = require("pg");
types.setTypeParser(1700, Number);
const pool = new Pool({
  database: "mywishlist",
});

module.exports = pool;