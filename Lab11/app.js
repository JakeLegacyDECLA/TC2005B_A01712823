const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const ruta_gwen = require('./Routes/gwen.routes');
app.use('/personajes/gwen', ruta_gwen);

const rutas_personajes = require('./Routes/personajes.routes');
app.use('/personajes', rutas_personajes);


app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);