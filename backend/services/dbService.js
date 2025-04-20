const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const executeSQLQuery = async (query) => {
  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('MySQL Error:', error);
    return [{ error: 'Invalid SQL or DB Error' }];
  }
};

module.exports = { executeSQLQuery };
