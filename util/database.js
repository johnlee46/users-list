const mysql = require('mysql2');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'sTzl3Okmti',
    database: 'sTzl3Okmti',
    password: 'bM4dpHTSQq'
});

module.exports = pool.promise();