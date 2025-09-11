const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let connect = null;

async function createDBconnection() {

 
  try {
    connect = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });

    console.log('database connected successfully');
    return connect;
  } catch (error) {
    console.log('database connection unsuccessfully', error);

    throw error;
  }
}

function getConnection() {
  if (!connect) {
    throw new error(
      'database connection  has not been establised,call cretaedbconnection  '
    );
  }
  return connect;
}

module.exports = { createDBconnection, getConnection };
