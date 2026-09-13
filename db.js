const { Pool, types } = require("pg");

types.setTypeParser(1700, Number);

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      database: "mywishlist",
    };

const pool = new Pool(poolConfig);

module.exports = pool;