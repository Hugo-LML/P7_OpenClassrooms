const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

router.post('/register', userCtrl.signUp);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;