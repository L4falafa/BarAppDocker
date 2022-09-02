//sesiones.js

const express = require('express');
const router = express.Router();
const controllers = require("../controllers/sesiones");
const middleware = require("../../extras/middleware");

// GET /sesiones - Devuelve la pagina de sesiones con todas las sesiones del usuario
router.get('/', middleware.ensureAuthenticated, controllers.default);

// POST /sesiones/newSesion - Crea una nueva sesion en la base de datos
router.post('/newSession', middleware.ensureAuthenticated, controllers.newSession);

// GET /sesiones - Devuelve la pagina de sesiones con las sesiones de la base de datos
router.get('/getCompras/:idSesion', middleware.ensureAuthenticated, controllers.getCompras);

module.exports = router;