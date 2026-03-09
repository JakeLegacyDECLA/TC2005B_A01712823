const Cuentas = require('../models/Inicio.model');

exports.get_login = (request, response, next) => {
    const username = request.session.username || '';
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: username,
        error: error
    });
};

exports.post_login = (request, response, next) => {
    const { username, password } = request.body;
    
    // Validar credenciales contra el modelo
    const resultado = Cuentas.validar(username, password);
    
    if (resultado.success) {
        request.session.username = username;
        response.redirect('/');
    } else {
        request.session.error = resultado.message;
        response.redirect('/users/login');
    }
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/');
    });
};

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    const username = request.session.username || '';
    response.render('signup', {
        username: username,
        error: error,
    });
};

exports.post_signup = (request, response, next) => {
    const { username, password, cpassword } = request.body;
    
    // Validar que las contraseñas coincidan
    if (password != cpassword) {
        request.session.error = 'Las contraseñas no coinciden';
        response.redirect('/users/signup');
        return;
    }

    // Validar que los campos no estén vacíos
    if (!username || !password) {
        request.session.error = 'Usuario y contraseña son obligatorios';
        response.redirect('/users/signup');
        return;
    }

    // Crear nueva cuenta
    const nuevaCuenta = new Cuentas(username, password);
    const resultado = nuevaCuenta.save();

    if (resultado.success) {
        request.session.username = username;
        response.redirect('/');
    } else {
        request.session.error = resultado.message;
        response.redirect('/users/signup');
    }
};

