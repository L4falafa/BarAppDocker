//caja.js

const express = require('express');
const router = express.Router();
const controllers = require("../controllers/caja");
const middleware = require("../../extras/middleware");

// GET /caja - Devuelve la pagina de caja con los productos de la base de datos
router.get('/', middleware.ensureAuthenticated, controllers.default);

// POST /caja/newCompra - Crea una nueva compra en la base de datos
router.post('/newCompra', middleware.ensureAuthenticated, controllers.storeCompra);

module.exports = router;