const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.get('/', userController.get_login);

router.get('/login', userController.get_login);
router.post('/login', userController.post_login);

router.get('/signup', userController.get_signup);
router.post('/signup', userController.post_signup);

router.get('/logout', userController.get_logout);

router.get('/personajes', userController.get_personajes);

module.exports = router;