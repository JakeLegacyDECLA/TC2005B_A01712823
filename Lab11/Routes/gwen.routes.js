const express = require('express');
const router = express.Router();

const html_header = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        <a href="/personajes">League of Legends</a>
      </h1>
        <p class="subtitle">
            My first website with <strong>Bulma</strong>!
        </p>
`;

const html_footer = `
    <!--script src="js/lol.js"></script-->
  </body>
</html>
`;

//Middleware
router.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

router.use((request, response, next) => {
    let html_index = `
            <a class="button is-primary" href="/personajes/new">Nuevo personaje</a>
            <div class="columns">
        `;

        for (let personaje of personajes) {
            html_index += `
                <div class="column">
                    ${personaje.nombre}
                    <figure class="image">
                        <img class="is-rounded" src="${personaje.imagen}" />
                    </figure>
                </div>
            `;
        }

        html_index += `
                    </div>
                </div>
            </section>
        `;

    response.send(html_header + html_index + html_footer); //Manda la respuesta
});


module.exports = router;