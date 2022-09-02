const dbManager = require("../models/dbManager");
const middleware = require("../../extras/middleware");
const moment = require("moment");

module.exports = {
    
    // GET /sesiones - Devuelve todas las sesiones de la base de datos
    default: async (req, res) => {
        let idUsuario = middleware.getUserFromAuthorizaton(req.cookies.Authorization)

        let sessions =await dbManager.mySqlQueryAsync(`SELECT * FROM sesion where idUsuario = '${idUsuario}'`)

        //usa moment para formatear la fecha
        sessions.forEach(session => {
            session.fecha = moment(session.fecha).format('YYYY-MM-DD HH:mm:ss');
        });

        res.render("sesiones", { 
            sessions: sessions, 
        });
    },
    //POST /sesiones - Crea una nueva sesion en la base de datos
    newSession: async (req, res) => {

        let insertedId = await dbManager.mySqlQueryAsync(`INSERT INTO sesion ( idUsuario) VALUES ( ${req.user})`);

        res.status(200).cookie('sessionId', insertedId.insertId, { maxAge: 900000, httpOnly: true }).send();
        
        console.log("Sesion creada");
    },
    //DELETE /sesiones - Elimina la sesion actual de la base de datos
    deleteSession: async (req, res) => {
        let sessionId = req.cookies.sessionId;
        let userId = middleware.getUserFromAuthorizaton(req.cookies.Authorization);

        await dbManager.mySqlQueryAsync(`DELETE FROM sesion WHERE id = ${sessionId} AND idUsuario = ${userId}`);
        res.status(200).clearCookie('sessionId').send();
        console.log("Sesion eliminada");
    },
    //Get Compras - Devuelve todas las compras de la sesion en la base de datos
    getCompras: async (req, res) => { 
        const { idSesion } = req.params;

        let compras = await dbManager.mySqlQueryAsync(`SELECT compras.id, compras.fecha, compras.mp, productos.linkImg,productos.precio, productos.nombre FROM compras INNER JOIN productos ON compras.idproducto = productos.id WHERE idsesion = ${idSesion}  ORDER BY compras.mp, compras.fecha DESC `);
        
        compras.forEach(compra => {
            compra.fecha = moment(compra.fecha).format('HH:mm:ss');
        }); 

        res.status(200).render("compras", {
            compras: compras,
        });
    }
}