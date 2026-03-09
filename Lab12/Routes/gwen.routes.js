const express = require('express');
const router = express.Router();

// 5) GET /gwen  (ruta #5)
router.get('/', (req, res) => {
  res.send('Gwen route module funcionando');
});

module.exports = router;