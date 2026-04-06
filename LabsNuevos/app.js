const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
// Servir la carpeta de uploads como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Configurar multer para manejo de archivos
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        // Concatenar timestamp para evitar conflictos de nombres
        callback(null, new Date().toISOString() + '-' + file.originalname);
    },
});

// Filtro para aceptar solo imágenes
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

// Registrar multer con opciones de storage y filtro
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('imagen'));

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);

const rutas_usuarios = require('./routes/users.routes');
app.use('/users', rutas_usuarios);
const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);

app.use((error, request, response, next) => {
    response.status(500).send(`Error interno del servidor: ${error.stack}`);
});

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);