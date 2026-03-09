const Personaje = require('../models/personaje.model');

exports.get_add = (request, response, next) => {
    response.render('new', {
        username: request.session.username || '',
    });
};

exports.post_add = async (request, response, next) => {
    try {
        const personaje = new Personaje(request.body.nombre, 
            request.body.descripcion, request.body.tipo, request.body.imagen);
        await personaje.save();
        response.setHeader('Set-Cookie', `ultimo_personaje=${personaje.nombre}; secure`)
        response.redirect('/personajes');
    } catch (error) {
        console.error('Error al crear personaje:', error);
        response.status(500).render('new', {
            username: request.session.username || '',
            error: 'Error al crear el personaje'
        });
    }
};

exports.get_old = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};

exports.get_list = async (request, response, next) => {
    try {
        console.log(request.get('Cookie'));
        const personajes = await Personaje.fetchAll();
        response.render('list', {
            username: request.session.username || '',
            personajes: personajes
        }); 
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        response.status(500).render('list', {
            username: request.session.username || '',
            personajes: [],
            error: 'Error al cargar los personajes'
        });
    }
};

exports.get_edit = async (request, response, next) => {
    try {
        const id = request.params.id;
        const personaje = await Personaje.fetchById(id);
        
        if (!personaje) {
            return response.status(404).render('error', {
                username: request.session.username || '',
                error: 'Personaje no encontrado'
            });
        }
        
        response.render('edit', {
            username: request.session.username || '',
            personaje: personaje
        });
    } catch (error) {
        console.error('Error al obtener personaje:', error);
        response.status(500).render('error', {
            username: request.session.username || '',
            error: 'Error al cargar el personaje'
        });
    }
};

exports.post_edit = async (request, response, next) => {
    try {
        const id = request.params.id;
        await Personaje.update(id, request.body.nombre, request.body.descripcion, 
            request.body.tipo, request.body.imagen);
        response.redirect('/personajes');
    } catch (error) {
        console.error('Error al actualizar personaje:', error);
        response.status(500).render('edit', {
            username: request.session.username || '',
            error: 'Error al actualizar el personaje'
        });
    }
};

exports.post_delete = async (request, response, next) => {
    try {
        const id = request.body.id;
        await Personaje.delete(id);
        response.redirect('/personajes');
    } catch (error) {
        console.error('Error al eliminar personaje:', error);
        response.status(500).json({
            error: 'Error al eliminar el personaje'
        });
    }
}