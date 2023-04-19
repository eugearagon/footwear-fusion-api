const {createCompraProducto, updateCompraProducto, deleteCompraProducto} = require('../controllers/compraProductoControllers')
const { Product, TalleProduct, ColorProduct, CompraProducto, Cart, Promotions } = require("../db")

const createCompraProductoHandler = async (req, res) => {
    try {
        const loginUserId = req.params.loginUserId;
        const { productId, talle, color, quantity } = req.body;
        const newCompraProducto = await createCompraProducto(productId, talle, color, quantity)
        res.status(201).json(newCompraProducto)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const updateCompraProductoHandler = async (req, res) => {
    try {
        const compraProductId = req.params.compraProductId;
        const { talle, quantity } = req.body;
        const compraProduct = await updateCompraProducto(compraProductId, talle, quantity)
        res.status(201).json(compraProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const deleteCompraProductoHandler = async (req, res) => {
    try {
        const compraProductId = req.params.compraProductId;
        await deleteCompraProducto(compraProductId);
        res.status(201).json("Producto eliminado del carrito!")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createCompraProductoHandler,
    updateCompraProductoHandler,
    deleteCompraProductoHandler
}
