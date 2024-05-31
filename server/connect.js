const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db-mysql-nyc3-90434-do-user-15887190-0.c.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'AVNS_ucHoMoV_simaZf-I-E9',
  database: 'cyberguardian'
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect DB: ' + err.stack);
    return;
  }

  console.log('Connected to the database.');
});

// Don't forget to end the connection when you're done
 connection.end();