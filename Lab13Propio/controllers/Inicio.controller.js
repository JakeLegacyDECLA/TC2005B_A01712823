const Inicio = require('../models/Inicio.model');

exports.getInicio = (request, response, next) => {
    const username = request.session.username || '';
    response.render('inicio', { username });
};