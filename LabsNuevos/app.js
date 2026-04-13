const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
// Servir la carpeta de uploads como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: true, //Guardar sesión incluso si está vacía - NECESARIO para Spotify
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
// Middleware para manejar peticiones JSON (AJAX)
app.use(bodyParser.json());

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

// Aplicar CSRF a todas las rutas EXCEPTO /spotify
app.use((request, response, next) => {
    // Exentar rutas de Spotify del CSRF
    if (request.path.startsWith('/spotify')) {
        return next();
    }
    csrfProtection(request, response, next);
});

const rutas_usuarios = require('./routes/users.routes');
app.use('/users', rutas_usuarios);
const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);
const rutas_spotify = require('./routes/spotify.routes');
app.use('/spotify', rutas_spotify);

// Ruta raíz - Redirigir a login
app.get('/', (request, response) => {
    response.redirect('/users/login');
});

// Ruta para página de información de AJAX
const isAuth = require('./util/is-auth');
app.get('/ajax-info', isAuth, (request, response) => {
    response.render('ajax-info', {
        username: request.session.username || ''
    });
});

app.use((error, request, response, next) => {
    response.status(500).send(`Error interno del servidor: ${error.stack}`);
});

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);