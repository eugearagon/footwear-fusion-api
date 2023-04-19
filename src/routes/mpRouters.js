const { Router } = require("express");
const { createPreferenceHandlers, getStatusCompra, handleSuccess } = require("../handlers/mpHandlers");
const { verifyToken, isUserBlocked } = require("../middlewares/userValidator");

const mpRouters = Router();

mpRouters.post("/create_preference",[verifyToken,isUserBlocked],createPreferenceHandlers)
mpRouters.get("/compra/:id", getStatusCompra)
mpRouters.get("/success", handleSuccess)


module.exports = mpRouters