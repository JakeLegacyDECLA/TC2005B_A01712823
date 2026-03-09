const db = require('../util/database');

module.exports = class Personaje {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_descripcion, mi_tipo, mi_imagen) {
        this.nombre = mi_nombre;
        this.descripcion = mi_descripcion;
        this.tipo = mi_tipo;
        this.imagen = mi_imagen;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto en la base de datos.
    async save() {
        try {
            // Primero obtenemos el ID del tipo
            const tipoResult = await db.query('SELECT id FROM tipo WHERE tipo = ?', [this.tipo]);
            
            if (tipoResult[0].length === 0) {
                throw new Error('Tipo de personaje no válido');
            }
            
            const tipo_id = tipoResult[0][0].id;
            
            // Insertamos el personaje en la base de datos
            const result = await db.query(
                'INSERT INTO personajes (nombre, descripcion, tipo_id, imagen) VALUES (?, ?, ?, ?)',
                [this.nombre, this.descripcion, tipo_id, this.imagen]
            );
            
            return result;
        } catch (error) {
            console.error('Error al guardar personaje:', error);
            throw error;
        }
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente de la base de datos.
    static async fetchAll() {
        try {
            const result = await db.query(
                'SELECT p.id, p.nombre, p.descripcion, p.imagen, t.tipo, p.created_at FROM personajes p JOIN tipo t ON p.tipo_id = t.id ORDER BY p.created_at DESC'
            );
            return result[0];
        } catch (error) {
            console.error('Error al obtener personajes:', error);
            throw error;
        }
    }

    //Método para obtener un personaje por ID
    static async fetchById(id) {
        try {
            const result = await db.query(
                'SELECT p.id, p.nombre, p.descripcion, p.imagen, t.tipo, p.created_at FROM personajes p JOIN tipo t ON p.tipo_id = t.id WHERE p.id = ?',
                [id]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error al obtener personaje por ID:', error);
            throw error;
        }
    }

    //Método para actualizar un personaje
    static async update(id, nombre, descripcion, tipo, imagen) {
        try {
            // Obtenemos el ID del tipo
            const tipoResult = await db.query('SELECT id FROM tipo WHERE tipo = ?', [tipo]);
            
            if (tipoResult[0].length === 0) {
                throw new Error('Tipo de personaje no válido');
            }
            
            const tipo_id = tipoResult[0][0].id;
            
            const result = await db.query(
                'UPDATE personajes SET nombre = ?, descripcion = ?, tipo_id = ?, imagen = ? WHERE id = ?',
                [nombre, descripcion, tipo_id, imagen, id]
            );
            
            return result;
        } catch (error) {
            console.error('Error al actualizar personaje:', error);
            throw error;
        }
    }

    //Método para eliminar un personaje
    static async delete(id) {
        try {
            const result = await db.query('DELETE FROM personajes WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error('Error al eliminar personaje:', error);
            throw error;
        }
    }

}