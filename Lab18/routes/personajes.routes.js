const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const personajesController = require('../controllers/personajes.controller');

router.get('/', isAuth, personajesController.get_add);
router.get('/add', isAuth, personajesController.get_add);
router.post('/edit', isAuth, personajesController.post_edit);
router.get('/:personaje_id/edit', isAuth, personajesController.get_edit);
router.get('/:personaje', isAuth, personajesController.get_list);
module.exports = router;
