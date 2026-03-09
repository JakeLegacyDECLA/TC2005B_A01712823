const Personaje = require('../models/personaje.model');

exports.get_add = (request, response, next) => {
    response.render('new', {
        username: request.session.username || '',
    });
};

exports.post_add = (request, response, next) => {
    const personaje = new Personaje(request.body.nombre, 
        request.body.descripcion, request.body.tipo, request.body.imagen);
    personaje.save();
    response.setHeader('Set-Cookie', `ultimo_personaje=${personaje.nombre}; secure`)
    response.redirect('/personajes');
};

exports.get_old = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};

exports.get_list = (request, response, next) => {
    console.log(request.get('Cookie'));
    const personajes = Personaje.fetchAll();
    response.render('list', {
        username: request.session.username || '',
        personajes: personajes}); 
};