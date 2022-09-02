//Config.js

let config = {
    //Token Secreto
    TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
    //Configuracion para la conexion a la DB Mysql
    databaseMySql:{
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "password",
        database: process.env.MYSQL_DATABASE || "bar"        
    },
    //Puerto de la aplicacion express
	port: 3000,
    //Datos del servidor de ejecucion formato fecha,hora y lenguaje 
	language: "es",
	timeFormat: 24
};

module.exports = config;