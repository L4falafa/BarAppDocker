//Controlador login y signup
const service = require("../../extras/services");
const dbManager = require('../models/dbManager.js');

module.exports = {
    //################# LOGIN #################
    //Busca en la base de datos si existe el usuario y si la contraseña es correcta si es asi devuelve un token
    login: async (req,res) => {
        const { username, password } = req.body;
         
        var user = await dbManager.mySqlQueryAsync("SELECT * FROM usuario WHERE username = "+"'"+username+"' AND password = "+"'"+password+"' ");
        //Si existe el usuario se loguea
        if(user.length == 1){
          console.log("Logged");
          res.status(200).send({ token: service.createToken(user[0]) });
        }
        else{
          res.status(404).send("Contraseña o usuario incorrecto")
          console.log("Contraseña o username incorrecto") 
        }
    },
    //################# LOGOUT #################
    //Cierra la sesion del usuario borrando la cookie del usuario guardando el token
    logout: async (req,res) => {
        res.status(200).clearCookie('Authorization');
        return res.redirect('/inicio');
    }
};