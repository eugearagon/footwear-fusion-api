const { createOrdenCompra, updateOrdenCompra, getOrdenesCompra, deleteOrdenCompra, getOrdenesCompraAdmin } = require('../controllers/ordenCompraControllers')

const createOrdenCompraHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {address, promotion, payment, orderStatus, total} = req.body.orden
        const cart = await createOrdenCompra(address, promotion, payment, orderStatus, total, userId);
        res.status(201).json(cart)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateOrdenCompraHandler = async (req, res) => {
    try {
        const loginUserId = req.params.loginUserId;
        const cart = await updateOrdenCompra(loginUserId);
        res.status(201).json(cart)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getOrdenesCompraHandler = async (req, res) => {
    try {
        const loginUserId = req.params.loginUserId;
        const ordenesCompra = loginUserId ? await getOrdenesCompra(loginUserId) : await getOrdenesCompraAdmin() ;
        res.status(201).json(ordenesCompra)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteOrdenCompraHandler = async (req, res) => {
    try {
        const loginUserId = req.params.loginUserId;
        const cart = await deleteOrdenCompra(loginUserId);
        res.status(201).json(cart)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createOrdenCompraHandler,
    updateOrdenCompraHandler,
    getOrdenesCompraHandler,
    deleteOrdenCompraHandler
}