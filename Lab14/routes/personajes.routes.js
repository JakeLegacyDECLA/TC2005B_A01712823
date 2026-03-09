const express = require('express');
const router = express.Router();

const personajesController = require('../controllers/personajes.controller');

router.get('/new', personajesController.get_add);
router.get('/add', personajesController.get_add);
router.get('/nuevo', personajesController.get_add);
router.post('/new', personajesController.post_add);
router.get('/old', personajesController.get_old);
router.use(personajesController.get_list);

module.exports = router;