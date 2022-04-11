const db = require('../config/database').getDB();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res, next) => {
    const {pseudo, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);
    const sql = `INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [pseudo, email, cryptedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({err});
        }
        else if (!validator.isEmail(email)) {
            const sql = `DELETE FROM users WHERE pseudo=? AND email=? AND password=?`;
            db.query(sql, [pseudo, email, cryptedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
            res.status(400).json({error: 'Rentrez une adresse mail valide !'});
        }
        else {
            res.status(201).json(result);
        }
    });
};

const maxAge = 24 * 60 * 60* 1000;
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        {expiresIn: maxAge}
    )
};

module.exports.signIn = (req, res, next) => {
    const {email, password} = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result.length == 0) {
                res.status(400).json({error: 'Adresse email incorrecte !'});
            }
            else {
                bcrypt.compare(password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            res.status(400).json({error: 'Mot de passe incorrect !'});
                        }
                        else {
                            const token = createToken(result[0].id);
                            res.cookie('jwt', token, {httpOnly: true, maxAge});
                            res.status(200).json({message: 'Mot de passe correct !'});
                        }
                    })
                    .catch(error => res.status(400).json({error}));
            }
        }
    });
}

module.exports.logout = (req, res, next ) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}