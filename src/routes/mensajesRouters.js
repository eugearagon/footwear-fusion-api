const { Router } = require("express");
const {
    mensajeBienvenidaHandlers,
    registroNewsletterHandlers,
    newsletterHandlers
} = require("../handlers/mensajesHandlers");
const { verifyToken, isAdmin } = require("../middlewares/userValidator");

const correoRouter = Router();

correoRouter.post("/bienvenida",mensajeBienvenidaHandlers)
correoRouter.post("/registroNewsletter",registroNewsletterHandlers)
correoRouter.post("/newsletter",newsletterHandlers)


module.exports = correoRouter;