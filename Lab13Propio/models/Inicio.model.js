const fs = require('fs');
const path = require('path');

const cuentasFile = path.join(__dirname, '../cuentas.json');

// Inicializar archivo si no existe
if (!fs.existsSync(cuentasFile)) {
    fs.writeFileSync(cuentasFile, JSON.stringify([], null, 2));
}

module.exports = class Cuentas {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Guardar nueva cuenta
    save() {
        const cuentas = JSON.parse(fs.readFileSync(cuentasFile, 'utf8'));
        
        // Verificar si el usuario ya existe
        const usuarioExistente = cuentas.find(c => c.username === this.username);
        if (usuarioExistente) {
            return {
                success: false,
                message: 'El usuario ya existe'
            };
        }

        // Agregar nueva cuenta
        cuentas.push({
            username: this.username,
            password: this.password
        });

        fs.writeFileSync(cuentasFile, JSON.stringify(cuentas, null, 2));
        return {
            success: true,
            message: 'Cuenta creada exitosamente'
        };
    }

    // Validar credenciales de login
    static validar(username, password) {
        const cuentas = JSON.parse(fs.readFileSync(cuentasFile, 'utf8'));
        const usuario = cuentas.find(c => c.username === username && c.password === password);
        
        if (usuario) {
            return {
                success: true,
                message: 'Credenciales válidas',
                username: usuario.username
            };
        }

        return {
            success: false,
            message: 'Usuario o contraseña incorrectos'
        };
    }

    // Obtener todas las cuentas (para debugging)
    static getAll() {
        return JSON.parse(fs.readFileSync(cuentasFile, 'utf8'));
    }

    // Limpiar archivo de cuentas
    static deleteAll() {
        fs.writeFileSync(cuentasFile, JSON.stringify([], null, 2));
    }
}