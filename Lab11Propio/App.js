const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutas_personajes = require('./Routes/personajes.routes');
app.use('/personajes', rutas_personajes);

const ruta_equipos = require('./Routes/equipos.routes');
app.use('/equipos', ruta_equipos);

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);