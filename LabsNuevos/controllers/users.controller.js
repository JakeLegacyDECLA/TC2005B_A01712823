const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.get_login = (request, response, next) => {
    response.render('login', {
        csrfToken: request.csrfToken(),
        error: request.session.error || '',
        username: request.session.username || '',
    });
};

exports.post_login = (request, response, next) => {
    User.fetchOne(request.body.username).then(([usuarios]) => {

        if (usuarios.length > 0) {

            bcrypt.compare(request.body.password, usuarios[0].password).then((doMatch) => {

                if (doMatch) {

                    request.session.isLoggedIn = true;
                    request.session.username = usuarios[0].username; // ← FIX

                    User.getPermisos(request.session.username).then(([permisos]) => {

                        request.session.permisos = permisos;

                        request.session.save(() => {
                            return response.redirect('/personajes');
                        });

                    }).catch((error) => {
                        console.log(error);
                        next(error);
                    });

                } else {
                    return response.redirect('/login');
                }

            }).catch((error) => {
                console.log(error);
                next(error);
            });

        } else {
            return response.redirect('/login');
        }

    }).catch((error) => {
        console.log(error);
        next(error);
    });
};

exports.get_logout = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('signup', {
        csrfToken: request.csrfToken(),
        error: error,
        username: request.session.username || '',
    });
};

exports.post_signup = (request, response, next) => {
    if (request.body.password != request.body.password_confirm) {
        request.session.error = 'Las contraseñas no coinciden';
        const user = new User(request.body.username, request.body.nombre, request.body.password, request.body.correo);
        return response.redirect('/users/signup');
    }else {
        const user = new User(request.body.username, request.body.nombre, request.body.password, request.body.correo);
        user.save().then(() => {
            return response.redirect('/users/login');
        }).catch((error) => {
            console.log(error);
            next(error);
        });
        return response.redirect('/users/login');
    }
}