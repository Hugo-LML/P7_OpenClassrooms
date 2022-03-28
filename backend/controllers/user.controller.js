const db = require('../database').getDB();

module.exports.signUp = (req, res, next) => {
    console.log(req.body);
    const sql = `INSERT INTO users (pseudo, email, password) VALUES ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).json({err});
            throw err;
        }
        res.status(200).json(result);
    });
};