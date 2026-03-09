const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);