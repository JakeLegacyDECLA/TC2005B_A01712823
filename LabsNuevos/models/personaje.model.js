const db = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class Personaje {
    constructor(mi_nombre, mi_descripcion, mi_tipo, mi_imagen) {
        this.nombre = mi_nombre;
        this.descripcion = mi_descripcion;
        this.tipo = mi_tipo;
        this.imagen = mi_imagen;
    } 

    save() {
        return db.execute('INSERT INTO personajes (nombre, descripcion, tipo_id, imagen) VALUES (?,?,?,?)', 
            [this.nombre, this.descripcion, this.tipo, this.imagen]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM personajes');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM personajes WHERE id = ?', [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    static edit(id, nombre, descripcion, tipo, imagen) {
        return db.execute(

        "UPDATE personajes SET nombre=?, descripcion=?, tipo=?, imagen=? WHERE id=?",
        [nombre, descripcion, tipo, imagen, id]
        );
    }
}