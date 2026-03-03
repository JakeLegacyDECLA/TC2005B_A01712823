const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

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

const rutas_usuarios = require('./routes/users.routes');
app.use('/users', rutas_usuarios);
const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);