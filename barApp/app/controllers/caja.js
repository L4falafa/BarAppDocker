const dbManager = require("../models/dbManager");
const middleware = require("../../extras/middleware");
const { registerDecorator } = require("handlebars");
const { mySqlQueryAsync } = require("../models/dbManager");

module.exports = {
    // GET /caja - Devuelve la pagina de caja con los productos de la base de datos
    default: async (req, res) => {
        sessionId = await req.cookies.sessionId;
        console.log(sessionId);
        res.render("caja", { 
            productos: await dbManager.mySqlQueryAsync(`SELECT * FROM productos`),
            sessionId: req.cookies.sessionId,
        });
        
    }, 
    //POST /caja/newCompra - Crea una nueva compra en la base de datos
    storeCompra: async (req, res) => {

        const { id } = req.body;;        
        const { sessionId } = req.cookies;
        isUserInSesion = await dbManager.mySqlQueryAsync(`SELECT * FROM sesion WHERE id = ${sessionId} AND idUsuario = ${req.user}`);
        if(isUserInSesion.length !== 1){
            res.status(401).send("El usuario no esta en la sesion");
            console.log("El usuario no esta en la sesion");
            return;
        }
        //Si la compra es en mercado pago o efectivo
        if(req.body.mp){
            mySqlQueryAsync(`INSERT INTO compras (idproducto, idsesion,mp) VALUES (${id}, ${sessionId},${req.body.mp})`);
        }else{
            mySqlQueryAsync(`INSERT INTO compras (idproducto, idsesion) VALUES (${id}, ${sessionId})`);
        }
        res.status(200).send();
    }
    
}