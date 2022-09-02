module.exports = {
    // GET /inicio - Devuelve la pagina de inicio
    default: (req, res) => {
        res.render("inicio", { title: "Inicio" });
    }
}