const { Router } = require("express");
const { getPreciosHandler } = require("../handlers/preciosHandlers");

const preciosRouters = Router();

preciosRouters.get("/", getPreciosHandler)

module.exports = preciosRouters;