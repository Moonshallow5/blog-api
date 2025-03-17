const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "blog",
//   password: '1Bangsars!',
//   port: 5432,
// });


module.exports = pool;