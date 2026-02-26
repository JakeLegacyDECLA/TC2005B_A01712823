const express = require('express');
const router = express.Router();

const gwen = {
  nombre: "Gwen",
  descripcion: `Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia, 
usa las mismas herramientas que en su momento la crearon. 
Lleva el peso del amor de su creadora a cada paso, sin dar nada por sentado. 
Bajo su mando está la Niebla Sagrada, una magia antigua y protectora que bendijo las tijeras, 
las agujas y el hilo de coser de Gwen. Muchas cosas son nuevas para Gwen, 
pero sigue decidida a luchar con gozo por el bien que prevalece en un mundo roto.`,
  tipo: "mago",
  imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
};

router.get('/', (req, res) => {
  const html = `
    <h1>${gwen.nombre}</h1>
    <p><strong>Tipo:</strong> ${gwen.tipo}</p>
    <img src="${gwen.imagen}" alt="${gwen.nombre}" style="max-width:600px;width:100%;border-radius:12px;" />
    <p style="margin-top:12px;white-space:pre-line;">${gwen.descripcion}</p>
    <p><a href="/personajes">Volver</a></p>
  `;
  res.send(html);
});

module.exports = router;