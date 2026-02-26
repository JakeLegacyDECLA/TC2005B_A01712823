const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.get('/', (request, response, next) => {
  response.send(`
    <h1>Nuevo personaje</h1>

    <form action="/personajes/new" method="POST">
      <label>Nombre</label><br>
      <input name="nombre" required><br><br>

      <label>Tipo</label><br>
      <input name="tipo" required><br><br>

      <label>Imagen (URL)</label><br>
      <input name="imagen" required><br><br>

      <label>Descripción</label><br>
      <textarea name="descripcion" rows="6" required></textarea><br><br>

      <button type="submit">Guardar</button>
    </form>

    <p><a href="/personajes">Volver</a></p>
  `);
});

router.post('/', (request, response, next) => {
    const {nombre, tipo, imagen, descripcion} = request.body;

    const filePath = path.join(__dirname, '../pepo.txt');
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }


  const registro =
`=== Nuevo personaje ===
Fecha: ${new Date().toISOString()}
Nombre: ${nombre}
Tipo: ${tipo}
Imagen: ${imagen}
Descripción: ${descripcion}
------------------------
`;

  fs.appendFile(filePath, registro, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return response.status(500).send('Error al guardar en el servidor');
    }

    response.send(`
      <h2>Guardado</h2>
      <p>Se guardó en <code>Lab11Propio/pepo.txt</code></p>
      <a href="/personajes">Volver</a>
    `);
  });
});

module.exports = router;