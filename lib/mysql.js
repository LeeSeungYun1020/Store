const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'lsy1020',
    database : 'store'
});

connection.connect();

module.exports = connection