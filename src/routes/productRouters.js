const { Router } = require("express");
const { createProductHandler, getProductHandler, getProductIdHandler, updateProductHandler, productPunctuationHandler } = require("../handlers/productHandlers");
const { verifyToken, isAdmin, isUserBlocked } = require("../middlewares/userValidator");

const productRouter = Router();

productRouter.post("/",[verifyToken, isAdmin, isUserBlocked],createProductHandler)
productRouter.get("/", getProductHandler)
productRouter.get("/punctuation",productPunctuationHandler)
productRouter.get("/:pruductId", getProductIdHandler)
productRouter.put("/:pruductId",[ verifyToken, isAdmin,isUserBlocked], updateProductHandler)

module.exports = productRouter;
