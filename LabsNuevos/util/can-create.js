module.exports = (request, response, next) => {
    if (request.session.permisos && request.session.permisos.some(permiso => permiso.nombre_privilegio === 'can-create')) {
        return next();
    }
    request.session.error = "No tiene autorizada esta parte de la aplicación, este incidente ha sido reportado.";
    return response.redirect('/users/login');
};