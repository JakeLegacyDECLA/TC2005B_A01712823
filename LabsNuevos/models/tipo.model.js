const db = require('../util/database');

module.exports = class Tipo {

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM tipo');
    }

}