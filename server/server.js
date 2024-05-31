const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const dbHost = "db-mysql-nyc3-90434-do-user-15887190-0.c.db.ondigitalocean.com";
const dbName = "cyberguardian";
const dbUser = "doadmin";
const dbPass = "AVNS_ucHoMoV_simaZf-I-E9";
const dbPort = 25060;

const connection = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    port: dbPort,
    ssl: {
        rejectUnauthorized: true,
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Database query error' });
        } else if (results.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.json({ message: 'Invalid email or password' });
        }
    });
});

// Handle registration
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Database query error' });
        } else if (results.length > 0) {
            res.json({ message: 'User already exists' });
        } else {
            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            connection.query(insertUserQuery, [email, password], (err, results) => {
                if (err) {
                    res.status(500).json({ message: 'Database query error' });
                } else {
                    res.json({ message: 'Registration successful' });
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
