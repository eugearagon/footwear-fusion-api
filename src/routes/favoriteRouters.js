const { Router } = require("express");
const {createFavoriteHandlers, getFovoritoHandlers, deletFavoritoHandler, deleteVaciarFavoritosHandler} = require("../handlers/favoriteHandlers");
const { verifyToken, isUserBlocked } = require("../middlewares/userValidator");

const favoriteRouters = Router();

favoriteRouters.post("/:userId/:productId", [verifyToken, isUserBlocked], createFavoriteHandlers)
favoriteRouters.get("/:userId", [verifyToken, isUserBlocked], getFovoritoHandlers)
favoriteRouters.delete("/:userId/:productId", [verifyToken, isUserBlocked], deletFavoritoHandler)
favoriteRouters.delete("/:userId", [verifyToken, isUserBlocked], deleteVaciarFavoritosHandler)

module.exports = favoriteRouters
