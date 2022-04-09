const db = require('../config/database').getDB();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const maxAge = 24 * 60 * 60* 1000;
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        {expiresIn: maxAge}
    )
};

module.exports.signIn = (req, res, next) => {
    try {
        const {email, password} = req.body;
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log('err');
                res.status(400).json({err});
            }
            else {
                bcrypt.compare(password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            res.status(400).json({error: 'Incorrect password !'});
                        }
                        else {
                            const token = createToken(result[0].id);
                            res.cookie('jwt', token, {httpOnly: true, maxAge});
                            res.status(200).json({message: 'Correct password !'});
                        }
                    })
                    .catch(error => res.status(400).json({error}));
            }
        });
    }
    catch (err) {
        res.status(400).json({err});
    }
}

module.exports.logout = (req, res, next ) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}