const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// ======================
// LOGIN PAGE
// ======================
exports.get_login = (request, response, next) => {

    const error = request.session.error;
    request.session.error = '';

    response.render('login', {
        csrfToken: request.csrfToken(),
        error: error || '',
        username: request.session.username || '',
    });

};


// ======================
// SIGNUP PAGE
// ======================
exports.get_signup = (request, response, next) => {

    response.render('signup', {
        csrfToken: request.csrfToken(),
        error: request.session.error || '',
        username: request.session.username || '',
    });

};


// ======================
// SIGNUP
// ======================
exports.post_signup = (request, response, next) => {

    if (request.body.password != request.body.password_confirm) {

        request.session.error = 'Las contraseñas no coinciden';
        return response.redirect('/users/signup');

    }

    const user = new User(
        request.body.username,
        request.body.nombre,
        request.body.password,
        request.body.correo
    );

    user.save()
        .then(() => {
            return response.redirect('/users/login');
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });

};


// ======================
// LOGOUT
// ======================
exports.get_logout = (request, response, next) => {

    request.session.destroy(() => {
        response.redirect('/users/login');
    });

};


// ======================
// PERSONAJES (PROTECTED)
// ======================
exports.get_personajes = (request, response, next) => {

    if (!request.session.isLoggedIn) {
        return response.redirect('/users/login');
    }

    response.render('list', {
        username: request.session.username,
        permisos: request.session.permisos || []
    });

};


// ======================
// LOGIN
// ======================
exports.post_login = async (request, response, next) => {

    try {

        console.log("LOGIN INTENT:", request.body.username);

        const [usuarios] = await User.fetchOne(request.body.username);
        console.log("USUARIOS DB:", usuarios);

        if (usuarios.length === 0) {
            request.session.error = "Usuario o contraseña incorrectos";
            return response.redirect('/users/login');
        }

        const usuario = usuarios[0];

        const doMatch = await bcrypt.compare(request.body.password, usuario.password);
        console.log("PASSWORD MATCH:", doMatch);

        if (!doMatch) {
            request.session.error = "Usuario o contraseña incorrectos";
            return response.redirect('/users/login');
        }

        request.session.isLoggedIn = true;
        request.session.username = usuario.username;

        const [permisos] = await User.getPermisos(usuario.username);
        console.log("PERMISOS:", permisos);

        request.session.permisos = permisos || [];

        request.session.save(() => {
            response.redirect('/personajes');
        });

    } catch (error) {
        console.log("ERROR LOGIN:", error);
        next(error);
    }

};