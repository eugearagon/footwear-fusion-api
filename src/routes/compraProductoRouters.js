const { Router } = require("express");
const { updateCompraProductoHandler, deleteCompraProductoHandler } = require("../handlers/compraProductoHandlers");

const compraProductoRouters = Router();

// compraProductoRouters.post("/", createCompraProductoHandler)
// compraProductoRouters.get("/:cartId", getCartIdHandler)
compraProductoRouters.put("/:compraProductId", updateCompraProductoHandler)
compraProductoRouters.delete("/:compraProductId", deleteCompraProductoHandler)

module.exports = compraProductoRouters;