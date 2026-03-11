const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.get('/', userController.get_login)
router.get('/login', userController.get_login);
router.post('/login', userController.post_login);
router.get('/signup', userController.get_logout);
router.post('/signup', userController.post_signup);
router.post('/logout', userController.post_signup);

module.exports = router;