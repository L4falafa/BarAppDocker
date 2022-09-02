//error404.js

var express = require('express');
var router = express.Router();

// Paginas no controladas
router.all('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;