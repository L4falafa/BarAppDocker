// middleware.js
var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("../config/Config.js");

module.exports = {
  // Comprueba si el usuario esta autenticado
  ensureAuthenticated: function (req, res, next) {
    if (!req.cookies.Authorization) {
      return res
      .status(403)
      .send({ message: "Tu petición no tiene cabecera de autorización" });
    }
    
    var token = req.cookies.Authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
  
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "El token ha expirado" });
    }
   
    req.user = payload.sub;
    console.log("Id: "+req.user);
    next();
  },
  // Devulve el la id de usuario del token
  getUserFromAuthorizaton : function (Authorization) {
 
    var token = Authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
  
    if (payload.exp <= moment().unix()) {
      return null;
    }
  
    user = payload.sub; 
    console.log("Id Usuario: "+user);
    return user; 
  },
}
