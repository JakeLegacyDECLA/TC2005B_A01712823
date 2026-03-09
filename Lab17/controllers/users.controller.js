const User = require('../models/users.model');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    
    response.render('login', {
        username: request.session.username || '',
        error: error
    });
};

exports.post_login = async (request, response, next) => {
    try {
        const { username, password } = request.body;
        
        // Validamos que los campos no estén vacíos
        if (!username || !password) {
            request.session.error = 'Por favor completa todos los campos';
            return response.redirect('/users/login');
        }
        
        // Buscamos el usuario en la base de datos
        const user = await User.fetchByUsername(username);
        
        if (!user) {
            request.session.error = 'Usuario o contraseña incorrectos';
            return response.redirect('/users/login');
        }
        
        // Verificamos la contraseña
        const isPasswordValid = await User.verifyPassword(password, user.password);
        
        if (!isPasswordValid) {
            request.session.error = 'Usuario o contraseña incorrectos';
            return response.redirect('/users/login');
        }
        
        // Si todo es correcto, guardamos la sesión
        request.session.username = username;
        response.redirect('/personajes');
    } catch (error) {
        console.error('Error en login:', error);
        request.session.error = 'Error al iniciar sesión';
        response.redirect('/users/login');
    }
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login');
    });
};

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    
    response.render('signup', {
        username: request.session.username || '',
        error: error,
    });
};

exports.post_signup = async (request, response, next) => {
    try {
        const { username, nombre, password, cpassword, correo } = request.body;
        
        // Validamos que los campos no estén vacíos
        if (!username || !nombre || !password || !cpassword || !correo) {
            request.session.error = 'Por favor completa todos los campos';
            return response.redirect('/users/signup');
        }
        
        // Validamos que las contraseñas coincidan
        if (password !== cpassword) {
            request.session.error = 'Las contraseñas no coinciden';
            return response.redirect('/users/signup');
        }
        
        // Verificamos si el usuario ya existe
        const existingUser = await User.fetchByUsername(username);
        
        if (existingUser) {
            request.session.error = 'El usuario ya existe';
            return response.redirect('/users/signup');
        }
        
        // Creamos el nuevo usuario
        const user = new User(username, nombre, password, correo);
        await user.save();
        
        request.session.username = username;
        response.redirect('/personajes');
    } catch (error) {
        console.error('Error en signup:', error);
        request.session.error = 'Error al crear la cuenta';
        response.redirect('/users/signup');
    }
};