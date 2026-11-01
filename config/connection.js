require("dotenv").config();
const mySql2 = require("mysql2/promise");

let pool;

const createPool = async () => {
  if (pool) return pool;

  pool = await mySql2.createPool({
    // Set these in .env (local) or the environment (Docker/server); never hardcode credentials
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "IMS",
  });

  return pool;
};

const getConnectionFromPool = async () => {
  const pool = await createPool();
  try {
    const connection = await pool.getConnection();
    console.log("Sql Connected");
    return connection;
  } catch (err) {
    console.error("Error getting connection from pool:", err);
    throw err; // rethrow the error to handle it elsewhere if needed
  }
};

module.exports = { createPool, getConnectionFromPool };