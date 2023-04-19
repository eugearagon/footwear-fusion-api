const { ReviewsPuntuacion } = require("../db");

const createReviews = async (punctuation, review,productId) => {
    const newReviews = await ReviewsPuntuacion.create({punctuation, review})
    const id = productId
    await newReviews.setProduct(id);
    return newReviews
}

module.exports ={
    createReviews
}