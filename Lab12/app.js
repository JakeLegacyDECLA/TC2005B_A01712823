const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// Body parser (POST forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas por módulos (2 módulos mínimo)
const ruta_personajes = require('./routes/personajes.routes');
const ruta_gwen = require('./routes/gwen.routes');

app.use('/personajes', ruta_personajes);
app.use('/gwen', ruta_gwen);

app.get('/', (req, res) => res.redirect('/personajes'));

app.use((req, res) => {
  res.status(404).send('404 - Ruta no encontrada');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});