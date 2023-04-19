const { Product, TalleProduct, ColorProduct, CompraProducto, Cart } = require("../db");

const createCompraProducto = async (id, talleProd, colorProd, qty) => {
    const product = await Product.findByPk(id);
    const newCompraProducto = await CompraProducto.create({ qty });
    await newCompraProducto.setProduct(product);
    await newCompraProducto.setTalleProduct(talleProd);
    if (Object.keys(colorProd).length !== 0) await newCompraProducto.setColorProduct(colorProd);
    return newCompraProducto;
};

const updateCompraProducto = async (compraProductId, talle, quantity) => {
    const compraProduct = await CompraProducto.findOne({ where: { id: compraProductId } });
    let newTalle;
    if (talle) {
        newTalle = await TalleProduct.findOne({ where: { talle } });
        if (!newTalle) {
            throw new Error(`El talle ${talle} no está disponible`);
        }
    };
    const updateData = {};
    if (newTalle) {
        updateData.TalleProductId = newTalle.id;
    };
    if (quantity) {
        updateData.qty = quantity;
    };
    await compraProduct.update(updateData);
    return compraProduct;
}

const deleteCompraProducto = async (compraProductId) => {
    await CompraProducto.destroy({
        where: { id: compraProductId }
    })
    return "Producto eliminado del carrito!";
}

module.exports = {
    createCompraProducto,
    updateCompraProducto,
    deleteCompraProducto
}