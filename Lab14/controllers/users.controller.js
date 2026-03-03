exports.get_login = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
    });
};

exports.post_login = (request, response, next) => {
    request.session.username = request.body.username;
    response.redirect('/personajes');
};

exports.get_logout = () => {
    request.session.destroy(() =>{
        response.redirect('/users/login');
    })
};

exports.get_signup = () => {
    const error = request.session.error || '';
    request.session.error  = '';
    response.render('/signup', {
        username: request.session.username || '',
        error: error,
    })
};

exports.post_signup = () => {
    if (request.body.password != request.body.cpassword) {
        request.session.error = 'Las contraseñas no coinciden';
        response.redirect('/users/signup');
    }
    response.redirect('/users/login');
};