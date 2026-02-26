const express = require('express');
const router = express.Router();

// Para que request.body funcione en este router
router.use(express.urlencoded({ extended: false }));

const personajes = [
  {
    nombre: "Gwen",
    descripcion: `Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia, 
            usa las mismas herramientas que en su momento la crearon. 
            Lleva el peso del amor de su creadora a cada paso, sin dar nada por sentado. 
            Bajo su mando está la Niebla Sagrada, una magia antigua y protectora que bendijo las tijeras, 
            las agujas y el hilo de coser de Gwen. Muchas cosas son nuevas para Gwen, 
            pero sigue decidida a luchar con gozo por el bien que prevalece en un mundo roto.`,
    tipo: "mago",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
  },
  {
    nombre: "Mordekaiser",
    descripcion: `Mordekaiser es un señor de la guerra nigromante que domina el carril superior con 
            daño mágico sostenido, gran aguante y una definitiva que aísla a enemigos en su "reino de la muerte". 
            Destaca por su pasiva de daño en área, su maza Ocaso y su capacidad para robar estadísticas, 
            siendo popular por su contundencia.`,
    tipo: "tanque",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg",
  },
  {
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
  },
];

// Middleware de log (lo dejé porque tú lo tenías)
router.use((request, response, next) => {
  console.log('Middleware!');
  next();
});

router.get('/', (request, response, next) => {
  response.render('list', { personajes });
});

router.get('/new', (request, response, next) => {
  response.render('new');
});

router.post('/new', (request, response, next) => {
  console.log(request.body);
  personajes.push(request.body);
  response.redirect('/personajes');
});

router.get('/old', (request, response, next) => {
  const path = require('path');
  response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
});

module.exports = router;