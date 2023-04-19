const {
    Product,
    LoginUser,
    MarcaProduct
} = require("../db")

//Para agragar los favoritos del usuario con el metodo addProduct() que se crea de la relacion de las tablas
const guardarFavorite = async (userId, productId) => {
    const user = await LoginUser.findByPk(userId);
    const product = await Product.findOne({where:{id: productId },
        include:[ {
            model: MarcaProduct,
            attributes: ['name']
        }
    ]})
    const producFavorite = {
        id: product.id,
        title: product.title,
        image: product.image,
        marca: product.MarcaProducts[0].name,
        price: product.price
    }
    await user.addProduct(product);
    return producFavorite;
}

//Para traer los favoritos del usuario con el metodo getProducts() que se crea de la relacion de las tablas
const getFavoritos = async (userId) => {
    const user = await LoginUser.findByPk(userId);
    const favoritos = await user.getProducts({ attributes: ['id','title', 'image', 'price'],include:[ {
        model: MarcaProduct,
        attributes: ['name']
    }
    
] });

const producFavorite = favoritos.map(produc => {
    return {
        id: produc.id,
        title: produc.title,
        image: produc.image,
        marca: produc.MarcaProducts[0].name,
        price: produc.price
    }
})

if(!favoritos) return "Todavia no tiene Favoritos cargados"
return producFavorite
}

//para remover un usuario, se usa el metodo removeProduct() que se crea de la relacion de las tablas
const deleteFavorito = async (userId, productId) => {
    const user = await LoginUser.findByPk(userId);
    const product = await Product.findByPk(productId);
    await user.removeProduct(product);
    return product;
  }

//Para eliminar todos los favoritos del usuario setiando la tabla de nuevo a un array vacio setProducts([])
const vaciarFavoritos = async (userId) => {
    console.log(userId)
    const user = await LoginUser.findByPk(userId);
    const product = []
    await user.setProducts(product);
    return user
  }

module.exports = {
    guardarFavorite,
    getFavoritos,
    deleteFavorito,
    vaciarFavoritos
}