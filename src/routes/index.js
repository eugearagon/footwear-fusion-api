const { Router } = require('express');
const productRouter = require("./productRouters");
const userRouter = require("./userRouters");
const reviewsRouter = require("./reviewsRouter");
const filterRouter = require("./arrFilterRouters");
const newsletterRouter = require("./newsletterRouter");
const favoriteRouters = require("./favoriteRouters");
const cartRouters = require("./cartRouters");
const compraProductoRouters = require("./compraProductoRouters");
const ordenCompraRouters = require("./ordenCompraRouters");
const preciosRouters = require("./preciosRouters");
const mpRouters = require('./mpRouters')
const adminRouter = require("./adminRouters")
const correoRouter = require("./mensajesRouters")
const promotionsRouter = require("./promotionsRouter")

const router = Router();

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewsRouter);
router.use('/filter', filterRouter);
router.use("/newsletter", newsletterRouter);
router.use("/favorite", favoriteRouters)
router.use('/cart', cartRouters);
router.use('/compraproducto', compraProductoRouters);
router.use('/ordencompra', ordenCompraRouters);
router.use('/precios', preciosRouters);
router.use('/mp', mpRouters)
router.use("/admin", adminRouter)
router.use("/correo", correoRouter)
router.use("/promotions", promotionsRouter)

module.exports = router;