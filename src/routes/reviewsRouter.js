const { Router } = require("express");
const { createReviewsHandler } = require("../handlers/reviewsHandler");
const { verifyToken, isUserBlocked } = require("../middlewares/userValidator");

const reviewsRouter = Router();

reviewsRouter.post("/:productId",[verifyToken,isUserBlocked], createReviewsHandler);


module.exports = reviewsRouter;