const { getcolor, getTalles, getMarcas, getCategori } = require("../controllers/arrayFilterControllers")

const getcolorHandlers = async (req, res) => {
    try {
        const color = await getcolor();
        res.status(201).json(color);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getTalleHandlers = async (req, res) => {
    try {
        const talle = await getTalles();
        res.status(201).json(talle);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getMarcasHandlers = async (req, res) => {
    try {
        const marcas = await getMarcas();
        res.status(201).json(marcas);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getCategoryHandlers = async (req, res) => {
    try {
        const category = await getCategori();
        res.status(201).json(category);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getcolorHandlers,
    getTalleHandlers,
    getMarcasHandlers,
    getCategoryHandlers
}