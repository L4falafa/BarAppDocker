// services.js
var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("../config/Config");

//Entonces se puede usar el token para autenticar al usuario
//Devulve un payload con el token y la fecha de expiracion encripatdos en un string
exports.createToken = function (user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};