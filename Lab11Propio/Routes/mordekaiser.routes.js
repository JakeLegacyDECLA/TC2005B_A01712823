const express = require('express');
const router = express.Router();

const mordekaiser = {
  nombre: "Mordekaiser",
  descripcion: `Mordekaiser es un señor de la guerra nigromante que domina el carril superior con 
daño mágico sostenido, gran aguante y una definitiva que aísla a enemigos en su "reino de la muerte". 
Destaca por su pasiva de daño en área, su maza Ocaso y su capacidad para robar estadísticas, 
siendo popular por su contundencia.`,
  tipo: "tanque",
  imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg",
};

router.get('/', (req, res) => {
  const html = `
    <h1>${mordekaiser.nombre}</h1>
    <p><strong>Tipo:</strong> ${mordekaiser.tipo}</p>
    <img src="${mordekaiser.imagen}" alt="${mordekaiser.nombre}" style="max-width:600px;width:100%;border-radius:12px;" />
    <p style="margin-top:12px;white-space:pre-line;">${mordekaiser.descripcion}</p>
    <p><a href="/personajes">Volver</a></p>
  `;
  res.send(html);
});

module.exports = router;