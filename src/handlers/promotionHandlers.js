const { createPromotion, getPromotion, updatePromotion } = require("../controllers/promotionControllers")
const { Promotions } = require("../db")

const createPromotionsHandler = async (req, res) => {
    try {
        const { discount } = req.body
        const promo = await createPromotion(discount);
        res.status(201).json(promo);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getPromotionsHandler = async (req, res) => {
    try {
        const { code } = req.params
        const codePromo = await getPromotion(code);
        res.status(201).json(codePromo)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const updatePromotionsHandler = async (req, res) => {
    try {
        const { promotionId, userId } = req.params
        const updatedPromo = await updatePromotion(promotionId, userId);
        res.status(201).json(updatedPromo)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


module.exports = {
    createPromotionsHandler,
    getPromotionsHandler,
    updatePromotionsHandler
}
