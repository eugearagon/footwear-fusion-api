const { Router } = require("express");
const { registroNewsletter, getNewsletterHandlers } = require("../handlers/newsletterHandlers");
const { verifyToken, isAdmin, verifyEmail, isUserBlocked } = require("../middlewares/userValidator");
const newsletterRouter = Router();

newsletterRouter.post("/", [verifyEmail],registroNewsletter);
newsletterRouter.get("/", [verifyToken, isAdmin,isUserBlocked], getNewsletterHandlers);

module.exports = newsletterRouter;
