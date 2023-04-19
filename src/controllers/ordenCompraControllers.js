const { Product, TalleProduct, ColorProduct, CompraProducto, Cart, Promotions, LoginUser, DataUser, OrdenCompra, MarcaProduct } = require("../db");
const { idCart } = require("./cartControllers");
const { mensajeCompra } = require("./mensajesControllers");


const createOrdenCompra = async (address, promotion, payment, orderStatus, total, userId) => {
    const cart = await idCart(userId)
    const user = await LoginUser.findByPk(userId);
    if (cart && user) {
        const newOrden = await OrdenCompra.create({
            address: address,
            promotion: promotion,
            payment: payment,
            orderStatus: orderStatus,
            total: total
        });
        newOrden.setCart(cart.id);
        cart.setOrdenCompra(newOrden)
        newOrden.setLoginUser(user);
        mensajeCompra(newOrden, userId);
        return newOrden
    }
};

const updateOrdenCompra = async () => {

};

const getOrdenesCompra = async (loginUserId) => {
    let allOrdenesCompras;
    loginUserId
        ? (allOrdenesCompras = await OrdenCompra.findAll({
            where: { LoginUserId: loginUserId },
        }))
        : (allOrdenesCompras = await OrdenCompra.findAll());

    const allOrdenesComprasComprasProducto = await Promise.all(
        allOrdenesCompras.map(async (oc) => {
            const compras = await CompraProducto.findAll({
                where: {
                    CartId: oc.CartId,
                },
                include: [
                    {
                        model: Product,
                        attributes: ["title", "price", "image", "code"],
                        include: [
                            {
                                model: MarcaProduct,
                                attributes: ["name"],
                                through: { attributes: [] },
                            },
                        ],
                    },
                    {
                        model: TalleProduct,
                        attributes: ["talle"],
                    },
                    {
                        model: ColorProduct,
                        attributes: ["color"],
                    },
                ],
            });

            oc.dataValues.comprasProducto = compras; 

            return {
                id: oc.dataValues.id,
                address: oc.dataValues.address,
                promotion: oc.dataValues.promotion,
                payment: oc.dataValues.payment,
                orderStatus: oc.dataValues.orderStatus,
                fecha:oc.dataValues.createdAt,
                total: oc.dataValues.total,
                comprasProducto: oc.dataValues.comprasProducto.map((cp) => {
                    return {
                        productId: cp.dataValues.ProductId,
                        qty: cp.dataValues.qty,
                        title: cp.dataValues.Product.dataValues.title,
                        price: cp.dataValues.Product.dataValues.price,
                        image: cp.dataValues.Product.dataValues.image,
                        code: cp.dataValues.Product.dataValues.code,
                        marca: cp.dataValues.Product.dataValues.MarcaProducts[0].dataValues.name,
                        talle: cp.dataValues.TalleProduct.dataValues.talle
                    };
                }),
            }
        })
    );

    return allOrdenesComprasComprasProducto;
};

const getOrdenesCompraAdmin = async () => {
    let allOrdenesCompras = await OrdenCompra.findAll();
    console.log(allOrdenesCompras);
    const allOrdenesComprasComprasProducto = await Promise.all(
        allOrdenesCompras.map(async (oc) => {
            const compras = await CompraProducto.findAll({
                where: {
                    CartId: oc.CartId,
                },
                include: [
                    {
                        model: Product,
                        attributes: ["title", "price", "image", "code"],
                        include: [
                            {
                                model: MarcaProduct,
                                attributes: ["name"],
                                through: { attributes: [] },
                            },
                        ],
                    },
                    {
                        model: TalleProduct,
                        attributes: ["talle"],
                    },
                    {
                        model: ColorProduct,
                        attributes: ["color"],
                    },
                ],
            });

            oc.dataValues.comprasProducto = compras; // Asignar la propiedad `comprasProducto` al objeto `oc`

            return {
                id: oc.dataValues.id,
                address: oc.dataValues.address,
                promotion: oc.dataValues.promotion,
                payment: oc.dataValues.payment,
                orderStatus: oc.dataValues.orderStatus,
                fecha:oc.dataValues.createdAt,
                total: oc.dataValues.total,
                comprasProducto: oc.dataValues.comprasProducto.map((cp) => {
                    return {
                        productId: cp.dataValues.ProductId,
                        qty: cp.dataValues.qty,
                        title: cp.dataValues.Product.dataValues.title,
                        price: cp.dataValues.Product.dataValues.price,
                        image: cp.dataValues.Product.dataValues.image,
                        code: cp.dataValues.Product.dataValues.code,
                        marca: cp.dataValues.Product.dataValues.MarcaProducts[0].dataValues.name,
                        talle: cp.dataValues.TalleProduct.dataValues.talle
                    };
                }),
            }
        })
    );
        console.log(allOrdenesComprasComprasProducto);
    return allOrdenesComprasComprasProducto;
};


const deleteOrdenCompra = async () => {

};

module.exports = {
    createOrdenCompra,
    updateOrdenCompra,
    getOrdenesCompra,
    getOrdenesCompraAdmin,
    deleteOrdenCompra
}