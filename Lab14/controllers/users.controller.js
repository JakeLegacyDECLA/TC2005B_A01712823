exports.get_login = (request, response, next) => {
    response.render('login');
};

exports.post_login = (request, response, next) => {
    request.session.username = request.body.username;
    response.redirect('/personajes');
};

exports.get_logout = () => {

};