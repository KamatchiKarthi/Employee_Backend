const mysql = require('mysql2/promise');

let connect = null;

async function createDBconnection() {
  try {
    connect = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Gowri@123',
      database: 'employee',
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
