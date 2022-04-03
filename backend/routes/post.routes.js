const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const postCtrl = require('../controllers/post.controller');

router.get('/', auth, postCtrl.readPost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;