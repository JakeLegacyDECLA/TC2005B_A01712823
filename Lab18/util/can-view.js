module.exports = (request, response, next) => {
    let continuar = true;
    for (let permiso of request.session.permisos) {
        if (permiso.nombre_privilegio == 'ver_personajes') {
            continuar = false;
            next();
        }
    }
    if (continuar) {
        request.session.error = 
            "No tiene autorizada esta parte de la aplicación, este incidente ha sido reportado.";
        return response.redirect('/login');
    }
};