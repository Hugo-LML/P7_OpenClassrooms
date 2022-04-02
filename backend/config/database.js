const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "p7_db"
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Connexion réussie !');
});

module.exports.getDB = () => {
    return db;
}