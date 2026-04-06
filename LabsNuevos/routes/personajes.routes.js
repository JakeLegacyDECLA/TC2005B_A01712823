const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canCreate = require('../util/can-create');
const personajesController = require('../controllers/personajes.controller');

router.get('/', isAuth, personajesController.get_list);
router.get('/add', isAuth, canCreate, personajesController.get_add);
router.post('/add', isAuth, canCreate, personajesController.post_add);
router.post('/edit', isAuth, personajesController.post_edit);
router.get('/:personaje_id/edit', isAuth, personajesController.get_edit);

// Rutas AJAX (devuelven JSON)
router.get('/api/tipos', isAuth, personajesController.get_types_json);
router.put('/api/change-type', isAuth, personajesController.put_change_type);

router.get('/:personaje', isAuth, personajesController.get_list);
module.exports = router;
