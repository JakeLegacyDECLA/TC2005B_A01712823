const express = require('express');
const router = express.Router();

const jax = {
  nombre: "Jax",
  descripcion: `Inigualable tanto en sus habilidades de armamentos únicos como en su mordaz sarcasmo, 
Jax es el último maestro de armas conocido de Icathia. 
Después de que su tierra natal fue destruida por su propia arrogancia al desencadenar el Vacío, 
Jax y su especie juraron proteger lo poco que quedó. Mientras la magia aumenta en el mundo, 
la amenaza durmiente se agita una vez más, y Jax vaga por Valoran, portando la última luz de 
Icathia y poniendo a prueba a todos los guerreros que conoce para ver si son suficientemente 
fuertes para erguirse a su lado...`,
  tipo: "tanque",
  imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg",
};

router.get('/', (req, res) => {
  const html = `
    <h1>${jax.nombre}</h1>
    <p><strong>Tipo:</strong> ${jax.tipo}</p>
    <img src="${jax.imagen}" alt="${jax.nombre}" style="max-width:600px;width:100%;border-radius:12px;" />
    <p style="margin-top:12px;white-space:pre-line;">${jax.descripcion}</p>
    <p><a href="/personajes">Volver</a></p>
  `;
  res.send(html);
});

module.exports = router;