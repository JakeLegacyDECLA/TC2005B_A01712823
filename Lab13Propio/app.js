const express = require('express'); 
const session = require('express-session');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

const inicioRoutes = require('./routes/Inicio.routes');
const usersRoutes = require('./routes/users.routes');

app.use('/', inicioRoutes);
app.use('/users', usersRoutes);

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);