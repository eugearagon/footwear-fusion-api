const { Router } = require("express");
const { createOrdenCompraHandler, updateOrdenCompraHandler, getOrdenesCompraHandler, deleteOrdenCompraHandler } = require("../handlers/ordenCompraHandlers");

const ordenCompraRouters = Router();

ordenCompraRouters.post("/:userId", createOrdenCompraHandler)
ordenCompraRouters.put("/:ordenCompraId", updateOrdenCompraHandler)
ordenCompraRouters.get("/admin", getOrdenesCompraHandler)
ordenCompraRouters.get("/:loginUserId", getOrdenesCompraHandler)
ordenCompraRouters.delete("/:ordenCompraId", deleteOrdenCompraHandler)

module.exports = ordenCompraRouters;