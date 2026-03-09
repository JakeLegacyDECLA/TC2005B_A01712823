const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    //Constructor de la clase
    constructor(username, nombre, password, correo) {
        this.username = username;
        this.nombre = nombre;
        this.password = password;
        this.correo = correo;
    }

    //Método para guardar un nuevo usuario en la base de datos
    async save() {
        try {
            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(this.password, 10);
            
            const result = await db.query(
                'INSERT INTO usuarios (username, nombre, password, correo) VALUES (?, ?, ?, ?)',
                [this.username, this.nombre, hashedPassword, this.correo]
            );
            
            return result;
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            throw error;
        }
    }

    //Método para obtener un usuario por username
    static async fetchByUsername(username) {
        try {
            const result = await db.query(
                'SELECT * FROM usuarios WHERE username = ?',
                [username]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    }

    //Método para obtener todos los usuarios
    static async fetchAll() {
        try {
            const result = await db.query('SELECT username, nombre, correo, created_at FROM usuarios');
            return result[0];
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    //Método para verificar la contraseña
    static async verifyPassword(password, hashedPassword) {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            console.error('Error al verificar contraseña:', error);
            throw error;
        }
    }

    //Método para actualizar un usuario
    static async update(username, nombre, correo) {
        try {
            const result = await db.query(
                'UPDATE usuarios SET nombre = ?, correo = ? WHERE username = ?',
                [nombre, correo, username]
            );
            
            return result;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    //Método para eliminar un usuario
    static async delete(username) {
        try {
            const result = await db.query('DELETE FROM usuarios WHERE username = ?', [username]);
            return result;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }

}
