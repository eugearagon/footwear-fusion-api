const { Router } = require("express");
const { createCartHandler, getCartIdHandler, updateCartIdHandler,getCartIDdHandler } = require("../handlers/cartHandlers");
const { verifyToken, isUserBlocked } = require("../middlewares/userValidator");

const cartRouters = Router();

cartRouters.post("/:loginUserId",[verifyToken, isUserBlocked], createCartHandler)
cartRouters.get("/:loginUserId",[verifyToken, isUserBlocked], getCartIdHandler)
cartRouters.put("/:cartId",[verifyToken, isUserBlocked], updateCartIdHandler)
cartRouters.get("/cartId/:loginUserId",[verifyToken, isUserBlocked], getCartIDdHandler)

module.exports = cartRouters;
