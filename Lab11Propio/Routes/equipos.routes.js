const express = require('express');
const router = express.Router();

router.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

router.get('/', (request, response) => {
  let html_index = `
  <div>
    <h1>Equipos en League of Legends</h1>

    <h2>La mayoría de equipos en LOL deben tener dos tanques, dos atacantes (magico o fisico) y un sanador</h2>
  `;

  html_index += `</div>`;

  response.send(html_index);
});

module.exports = router;