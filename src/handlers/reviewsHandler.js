const {createReviews} = require("../controllers/reviews");

const createReviewsHandler = async (req, res) => {
    try {
        const { punctuation, review} = req.body.puntuacion;
        const {productId} = req.params
        const newReviews = await createReviews(punctuation, review, productId);
        res.status(201).json(newReviews)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createReviewsHandler
}