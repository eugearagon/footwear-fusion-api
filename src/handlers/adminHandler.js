const { crearUserAdmin, adminProductId } = require("../controllers/adminControllers");

const createAdminHandlers = async (req, res) => {
    try {
        const {email, rol} = req.body;
        const newUser = await crearUserAdmin(email, rol);
        if(newUser) res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}
const adminProductIdHandler = async (req, res) => {
    try {
        const {pruductId} = req.params;
        const product = await adminProductId(pruductId);
        res.status(201).json(product)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
module.exports = {
    createAdminHandlers,
    adminProductIdHandler
}