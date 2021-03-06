const mysql = require('mysql');
const postgres = require('pg');
const dbConfig = require('../config/db.config');
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error =>{
    if(error) throw error;
    console.log("successfully connected to the database");
})
// connection.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = connection;