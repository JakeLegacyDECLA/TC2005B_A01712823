const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const ARCHIVO = path.join(__dirname, '..', 'personajes.txt');

const personajes = [
  {
    nombre: "Gwen",
    descripcion: "Gwen, una antigua muñeca que se transformó y cobró vida...",
    tipo: "mago",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
  },
  {
    nombre: "Mordekaiser",
    descripcion: "Mordekaiser es un señor de la guerra nigromante...",
    tipo: "tanque",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg",
  },
  {
    nombre: "Jax",
    descripcion: "Inigualable tanto en sus habilidades...",
    tipo: "tanque",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg",
  },
];

// 1) GET /personajes  (ruta #1)
router.get('/', (req, res) => {
  res.render('list', { personajes });
});

// 2) GET /personajes/new (ruta #2)
router.get('/new', (req, res) => {
  res.render('new');
});

// 3) POST /personajes/new (ruta #3)
router.post('/new', (req, res) => {
  const nuevo = {
    nombre: req.body.nombre || "",
    descripcion: req.body.descripcion || "",
    tipo: req.body.tipo || "",
    imagen: req.body.imagen || "",
  };

  personajes.push(nuevo);

  // Guardar en archivo de texto
  const linea = `[${new Date().toISOString()}] ${nuevo.nombre} | ${nuevo.tipo} | ${nuevo.imagen} | ${nuevo.descripcion}\n`;

  fs.appendFile(ARCHIVO, linea, 'utf8', (err) => {
    if (err) {
      return res.status(500).send('Error guardando en archivo: ' + err.message);
    }
    res.redirect('/personajes');
  });
});

// 4) GET /personajes/about (ruta #4)<
router.get('/about', (req, res) => {
  res.send('About personajes: Express + EJS + POST + TXT');
});

module.exports = router;