const db = require('../config/database').getDB();

module.exports.readPost = (req, res, next) => {
    const sql = `SELECT * FROM posts`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.createPost = (req, res, next) => {
    const post = {
        poster_id: req.body.posterId,
        message: req.body.message,
        image: req.body.image,
        video: req.body.video,
        date: req.body.date
    }
    const sql = `INSERT INTO posts (poster_id, message, image, video, date) VALUES ('${post.poster_id}', '${post.message}', '${post.image}', '${post.video}', '${post.date}')`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(201).json(result);
        }
    });
}

module.exports.updatePost = (req, res, next) => {
    const messageUpdated = req.body.message;
    const id = req.params.id;
    const sql = `UPDATE posts SET message='${messageUpdated}' WHERE id='${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    const sql = `DELETE FROM posts WHERE id='${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}


module.exports.likeUnlike = (req, res, next) => {
    const userID = req.body.user;
    const postID = req.params.id;
    const sqlSelect = `SELECT * FROM likes WHERE liker_id='${userID}' AND postLiked_id='${postID}'`;
    db.query(sqlSelect, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result.length != 0) {
                const sqlDelete = `DELETE FROM likes WHERE liker_id='${userID}' AND postLiked_id='${postID}'`;
                db.query(sqlDelete, (err, result) => {
                    if (err) {
                        res.status(400).json({err});
                    }
                    else {
                        res.status(200).json(result);
                    }
                });
            }
            else {
                const sqlInsert = `INSERT INTO likes (liker_id, postLiked_id) VALUES ('${userID}', '${postID}')`;
                db.query(sqlInsert, (err, result) => {
                    if (err) {
                        res.status(400).json({err});
                    }
                    else {
                        res.status(200).json(result);
                    }
                });
            }
        }
    });
}

module.exports.postLikedByUser = (req, res, next) => {
    const userID = req.body.user;
    const postID = req.params.id;
    const sql = `SELECT * FROM likes WHERE liker_id='${userID}' AND postLiked_id='${postID}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.countLikes = (req, res, next) => {
    const postID = req.params.id;
    const sql = `SELECT COUNT(*) AS totalLikes FROM likes WHERE postLiked_id='${postID}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}