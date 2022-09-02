// auth.js
const express = require('express');
const { ensureAuthenticated } = require('../../extras/middleware');
const router = express.Router();
const controllers = require("../controllers/login");

// GET /login - Devuelve la pagina de login
router.post('/login', controllers.login);
// GET /logout - Cierra la sesion del usuario
router.get('/logout', ensureAuthenticated, controllers.logout);

module.exports = router;