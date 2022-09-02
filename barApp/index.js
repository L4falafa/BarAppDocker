//Requerimiento de modulos
const express = require('express')
const hbs = require('hbs');
const bodyParser = require("body-parser")
const dbManager = require('./app/models/dbManager');
const path = require('path');
const config = require('./config/Config.js');
const middleware = require('./extras/middleware.js');
var cookieParser = require('cookie-parser');

//creacion de la aplicacion express 
const app = express();
const port = config.port; 

//Body parser para convertir el body en peticiones automaticamente a objetos
app.use(bodyParser.urlencoded({
  extended:true
})); 

app.use(cookieParser());

//#################################
//Carpeta publica de recurso
app.use(express.static(path.join(__dirname + "/public")));

//#################################
//HandeBars
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname + "/views"));

//#################################
//Camino de las rutas

const error404 = require('./app/routes/error404');
const auth = require('./app/routes/auth');
const inicio = require('./app/routes/inicio');
const sesiones = require('./app/routes/sesiones');
const caja = require('./app/routes/caja');

//Se inician las rutas con el controlador
app.use('/inicio', inicio);
app.use('/auth', auth);
app.use('/sesiones', sesiones);
app.use('/caja', caja);

//#################################
app.get('/', (req, res) => {
  res.redirect('/inicio');
});

app.get("/test", (req,res)=>  { 
  res.send(req.cookies.Authorization);
});

app.use(error404);
//#################################

//Inicio de aplicacion escuchando 
app.listen(port, () => {
  //dbManager.testConnection();
  console.log(`Escuchando en el puertoooo ${port}`)
})