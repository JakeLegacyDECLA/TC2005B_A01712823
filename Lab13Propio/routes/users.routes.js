const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');

router.get('/login', UsersController.get_login);
router.post('/login', UsersController.post_login);

router.get('/logout', UsersController.get_logout);

router.get('/signup', UsersController.get_signup);
router.post('/signup', UsersController.post_signup);

module.exports = router;
