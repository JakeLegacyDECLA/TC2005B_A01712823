const express = require('express');
const router = express.Router();

const InicioController = require('../controllers/Inicio.controller');

router.get('/', InicioController.getInicio);
router.get('/inicio', InicioController.getInicio);

module.exports = router;