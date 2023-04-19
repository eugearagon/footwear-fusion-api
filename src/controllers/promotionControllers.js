const { Promotions, Cart } = require("../db");
const moment = require('moment');
const { idCart } = require("./cartControllers");


const createPromotion = async (discount) => {
    const promo = await Promotions.create({
        discount
    })
    return promo;
}

const getPromotion = async (code) => {
    // Obtener la fecha actual
    const currentDate = new Date();
    const codePromo = await Promotions.findOne({
        where: {
            code: code,
            current: true,
        }
    });
    if (!codePromo) { throw new Error('Código inválido')};
    if (currentDate.getTime() < codePromo.expiration.getTime()) {
        return codePromo;
    } else {
        return 'Tu promo expiró';
    };
}

const updatePromotion = async (promotionId, userId) => {
    const cartUser = await idCart(userId); // Obtener el cart
    const codePromo = await Promotions.findOne({
        where: {
            id: promotionId,
            current: true,
        }
    });; // Obtener la promo
    if (!cartUser) { throw new Error('El usuario no tiene carrito') };
    if (!codePromo) { throw new Error('Código inválido') };
    await codePromo.setCart(cartUser);
    await cartUser.setPromotion(codePromo)
    codePromo.update({ current: false });
    return codePromo;
}

module.exports = {
    createPromotion,
    getPromotion,
    updatePromotion
}