const db = require('../database').getDB();
const validator = require('validator');
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res, next) => {
    try {
        const {pseudo, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt);
        const sql = `INSERT INTO users (pseudo, email, password) VALUES ('${pseudo}', '${email}', '${cryptedPassword}')`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({err});
            }
            else if (!validator.isEmail(email)) {
                const sql = `DELETE FROM users WHERE pseudo='${pseudo}' AND email='${email}' AND password='${cryptedPassword}'`;
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(result);
                    }
                });
                console.log('No GG !');
                res.status(400).json({message: 'No GG !'});
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        res.status(400).json({err});
    }
};

module.exports.getAllUsers = (req, res, next) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.getUser = (req, res, next) => {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id='${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.updateUser = (req, res, next) => {
    const pseudo = req.body.pseudo;
    const id = req.params.id;
    const sql = `UPDATE users SET pseudo='${pseudo}' WHERE id='${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id='${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}