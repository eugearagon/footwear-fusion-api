const { Product } = require("../db")

const getPreciosUnicos = async (res, req) => {
    try {
        const prices = await Product.findAll({ attributes: ['price'], group: 'price' });
        const uniquePrices = prices.map(product => parseInt(product.dataValues.price)).filter((price, index, array) => array.indexOf(price) === index);
        const uniquePricesSorted = uniquePrices.sort(
            function (a, b) {
                return a - b;
            });
        return uniquePricesSorted;
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = { getPreciosUnicos }