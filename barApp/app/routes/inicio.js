//inicio.js

var express = require('express');
var router = express.Router();
const inicio = require("../controllers/inicio");

// GET /inicio - Devuelve la pagina de inicio donde se loguea el usuario
router.get('/', inicio.default);

module.exports = router;