const mysql = require('mysql');
const postgres = require('pg');
const dbConfig = require('../config/db.config');
const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error =>{
    if(error) throw error;
    console.log("successfully connected to the database");
})

module.exports = connection;