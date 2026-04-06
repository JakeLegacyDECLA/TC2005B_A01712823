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


