const { Router } = require("express");
const { getcolorHandlers, getTalleHandlers, getMarcasHandlers, getCategoryHandlers } = require("../handlers/arrFilterHandlers");

const filterRouter = Router();

filterRouter.get("/color",getcolorHandlers);
filterRouter.get("/talle", getTalleHandlers);
filterRouter.get("/marca",getMarcasHandlers);
filterRouter.get("/category", getCategoryHandlers);


module.exports = filterRouter;