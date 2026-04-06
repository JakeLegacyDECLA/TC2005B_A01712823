const Personaje =  require('../models/personaje.model');
const Tipo = require('../models/tipo.model');

exports.get_add = (request, response, next) => {
    Tipo.fetchAll().then(([rows, fieldData]) => {
        response.render('new', {
            csrfToken: request.csrfToken(),
            username: request.session.username || '',
            tipos: rows,
        });
    }).catch((error) => {
        next(error)
    });
};


exports.post_add = (request, response, next) => {
    // Verificar que se haya subido un archivo
    if (!request.file) {
        return next(new Error('Debe seleccionar una imagen'));
    }

    const personaje = new Personaje(
        request.body.nombre,
        request.body.descripcion,
        request.body.tipo,
        request.file.path  // Usar la ruta del archivo subido
    );
    personaje.save().then(() => {
        return response.redirect('/personajes');
    }).catch((error) => {
        next(error);
    });
};

exports.get_list = (request, response, next) => {
    console.log(request.session.permisos);
    Personaje.fetch(request.params.personaje_id).then(([rows, fieldData]) => {
        return response.render('list', {
            permisos: request.session.permisos || [],
            username: request.session.username || '',
            personajes: rows,
            csrfToken: request.csrfToken(),
        }); 
    }).catch((error) => {
        next(error);
    });
};



exports.get_edit = (request, response, next) => {
    Personaje.fetchOne(request.params.personaje_id).then(([personaje, fieldData]) => {
        console.log(personaje[0]);
        Tipo.fetchAll().then(([rows, fieldData]) => {
            response.render('new', {
                edit: true,
                personaje: personaje[0],
                csrfToken: request.csrfToken(),
                username: request.session.username || '',
                tipos: rows,
            });
        }).catch((error) =>  {
            next(error);
        });

        }).catch((error) =>  {
            next(error);
        });
}

exports.post_edit = (request, response, next) => {
    // Obtener la imagen actual del personaje
    Personaje.fetchOne(request.body.id).then(([personajeActual, fieldData]) => {
        // Si no se subió nuevo archivo, mantener la imagen anterior
        const imagenFinal = request.file ? request.file.path : personajeActual[0].imagen;
        
        Personaje.edit(request.body.id, request.body.nombre, request.body.descripcion, request.body.tipo, imagenFinal).then(() => {
            return response.redirect('/personajes');
        }).catch((error) => {
            next(error);
        });
    }).catch((error) => {
        next(error);
    });
}

// AJAX: Cambiar tipo de personaje asincronamente
exports.put_change_type = (request, response, next) => {
    const { id, tipo_id } = request.body;

    // Validar que se envíen los datos necesarios
    if (!id || !tipo_id) {
        return response.status(400).json({ 
            success: false, 
            message: 'Faltan datos requeridos' 
        });
    }

    // Obtener datos actuales del personaje
    Personaje.fetchOne(id).then(([personajeActual, fieldData]) => {
        if (!personajeActual || personajeActual.length === 0) {
            return response.status(404).json({ 
                success: false, 
                message: 'Personaje no encontrado' 
            });
        }

        // Actualizar solo el tipo
        Personaje.edit(
            id, 
            personajeActual[0].nombre, 
            personajeActual[0].descripcion, 
            tipo_id, 
            personajeActual[0].imagen
        ).then(() => {
            response.status(200).json({ 
                success: true, 
                message: 'Tipo de personaje actualizado exitosamente' 
            });
        }).catch((error) => {
            next(error);
        });
    }).catch((error) => {
        next(error);
    });
};

// AJAX: Obtener todos los tipos para el selector
exports.get_types_json = (request, response, next) => {
    Tipo.fetchAll().then(([rows, fieldData]) => {
        response.status(200).json({ 
            success: true, 
            tipos: rows 
        });
    }).catch((error) => {
        next(error);
    });
};


