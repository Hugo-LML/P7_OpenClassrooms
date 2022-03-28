const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Thssld2002"
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Connexion réussie !');
});