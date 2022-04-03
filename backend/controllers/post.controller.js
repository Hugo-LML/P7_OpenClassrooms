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
        likes: req.body.likes,
        comments_id: req.body.comments_id,
        date: req.body.date
    }
    const sql = `INSERT INTO posts (poster_id, message, image, video, likes, comments_id, date) VALUES ('${post.poster_id}', '${post.message}', '${post.image}', '${post.video}', '${post.likes}', '${post.comments_id}', '${post.date}')`;
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

}


module.exports.deletePost = (req, res, next) => {

}